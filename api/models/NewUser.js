import mongoose from "mongoose";

const NewUserSchema = new mongoose.Schema(
  {
    first: {
      type: String,
      required: true,
    },
    last: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewReservation'
      }
  ]
  },
  { timestamps: true }
);



export default mongoose.model("NewUser", NewUserSchema);