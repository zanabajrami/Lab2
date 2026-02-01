import Passenger from "../models/passenger.js";

export const getAllPassengers = async (req, res) => {
    try {
        const passengers = await Passenger.find();
        res.status(200).json(passengers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching passengers", error });
    }
};