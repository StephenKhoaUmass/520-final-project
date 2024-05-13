import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    date: {
        type: Date,
        required: true
    },
    confirmationId: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    email: { 
        type: String,
    }
  }
);
  
export default mongoose.model("NewReservation", ReservationSchema);
