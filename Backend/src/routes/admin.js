import express from "express";

import { AdminController }
from "../controllers/AdminController.js";
import { TicketController } from "../controllers/TicketController.js";

const router = express.Router();

router.get(
  "/",
  AdminController.getAdminStats
);

router.get(
  "/usage-chart",
  AdminController.getUsageChart
);

router.get(
  "/payment-history",
  AdminController.getPaymentHistory
);

router.get(
  "/monitoring-units",
  AdminController.getMonitoringUnits
);

router.get(
  "/billing-stats",
  AdminController.getBillingStats
);

router.get(
  "/billing-table",
  AdminController.getBillingTable
);

router.post(
  "/unit-price",
  AdminController.updateUnitPrice
);

router.get(
  "/tickets",
  TicketController.getAllTickets
);

router.patch(
  "/tickets/:id/status",
  TicketController.completeTicket
);
export default router;