import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.model("Admin", adminSchema);
