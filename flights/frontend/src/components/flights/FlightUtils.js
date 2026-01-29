import { useEffect } from "react";

export const generateFlightVariants = (flight, count = 2, intervalHours = 2) => {
  if (!flight.oneWay) return [];
  const variants = [];
  for (let i = 0; i < count; i++) {
    const dep = new Date(`1970-01-01T${flight.oneWay.departure}:00`);
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

export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isLocked]);
};