import db from "./config/db.js";
import { baseFlights } from "./data/baseFlights.js";

const generateFlightVariants = (flight, count = 2, intervalHours = 2) => {
  if (!flight.oneWay) return [];
  const variants = [];
  for (let i = 0; i < count; i++) {
    const dep = new Date(`1970-01-01T${flight.departureTime}:00`);
    const arr = new Date(`1970-01-01T${flight.oneWay.arrival}:00`);
    dep.setHours(dep.getHours() + i * intervalHours);
    arr.setHours(arr.getHours() + i * intervalHours);

    variants.push({
      ...flight,
      id: `${flight.id}-oneWay-${i}`,
      oneWay: {
        departure: dep.toTimeString().slice(0, 5),
        arrival: arr.toTimeString().slice(0, 5),
        duration: flight.oneWay.duration,
        price: flight.oneWay.price
      },
      return: null,
      isReturn: false
    });

    if (flight.return) {
      const retDep = new Date(`1970-01-01T${flight.return.departure}:00`);
      const retArr = new Date(`1970-01-01T${flight.return.arrival}:00`);
      retDep.setHours(retDep.getHours() + i * intervalHours);
      retArr.setHours(retArr.getHours() + i * intervalHours);

      variants.push({
        ...flight,
        id: `${flight.id}-return-${i}`,
        oneWay: {
          departure: dep.toTimeString().slice(0, 5),
          arrival: arr.toTimeString().slice(0, 5),
          duration: flight.oneWay.duration,
          price: flight.oneWay.price
        },
        return: {
          departure: retDep.toTimeString().slice(0, 5),
          arrival: retArr.toTimeString().slice(0, 5),
          returnTo: flight.return.returnTo,
          returnToCode: flight.return.returnToCode
        },
        isReturn: true
      });
    }
  }
  return variants;
};

// Funksioni për futjen në DB
const insertFlights = async () => {
  for (const flight of baseFlights) {
    const variants = generateFlightVariants(flight, 2);

    for (const v of variants) {
      const validDaysStr = v.validDays ? v.validDays.join(',') : '';
      const origin = v.oneWay ? v.from : v.to;
      const fromCode = v.oneWay ? v.fromCode : v.toCode;
      const destination = v.oneWay ? v.to : v.from;
      const toCode = v.oneWay ? v.toCode : v.fromCode;
      const departure = v.oneWay ? v.oneWay.departure : v.return.departure;
      const arrival = v.oneWay ? v.oneWay.arrival : v.return.arrival;
      const duration = v.oneWay ? v.oneWay.duration : v.oneWay.duration;
      const price = v.oneWay ? v.oneWay.price : v.oneWay.price;
      const isReturn = v.isReturn ? 1 : 0;

      try {
        await db.query(
          `INSERT INTO flights 
          (flight_code, airline, origin, from_code, destination, to_code, departure_time, arrival_time, duration, price, is_return, valid_days)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [`${v.airline.toUpperCase()}-${v.id}`, v.airline, origin, fromCode, destination, toCode, departure, arrival, duration, price, isReturn, validDaysStr]
        );
      } catch (err) {
        console.log("Error inserting flight:", err);
      }
    }
  }
  console.log("All flights inserted!");
};

insertFlights();
