import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";
import { TicketController } from "../controllers/TicketController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  TicketController.createTicket
);

router.get(
  "/my",
  authMiddleware,
  TicketController.getMyTickets
);

export default router;