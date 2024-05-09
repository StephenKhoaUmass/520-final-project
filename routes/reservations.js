import express from "express";
import {
  createReservation,
  getReservationsByUserId,
  deleteReservation,
  checkAvailableSlots
} from "../controllers/reservation.js";

const router = express.Router();

router.get("/slots/:id/:date", checkAvailableSlots)
router.post("/", createReservation);
router.delete("/:id", deleteReservation);
router.get("/user/:id", getReservationsByUserId);

export default router;
