import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: Number,
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d",
  },
});

export default mongoose.model("RefreshToken", schema);
