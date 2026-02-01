import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema({
    booking_id: {
        type: Number,
        default: null
    },
    booking_code: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    passport_number: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    nationality: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Passenger", PassengerSchema);