import { authenticate, AuthRequest } from "../middleware/auth";
import { Response, Router } from "express";

const router = Router();

// GET /api/dashboard
router.get("/", authenticate, (_req: AuthRequest, res: Response) => {
  res.json({
    overview: {
      totalShipment: { count: 34, percentage: 90, vsLastMonth: 4 },
      totalExports: { count: 34, percentage: 90, vsLastMonth: 4 },
      totalImport: { count: 34, percentage: 90, vsLastMonth: 4 },
      balance: 3000000.28,
    },
    recentShipments: [
      {
        trackingId: "MAF-100-234-291",
        pickUpFrom: "Lagos, Nigeria",
        processingTime: "10 hours",
        deliveryTo: "Oyo Nigeria",
        sender: "Bunmi Tanny",
        status: "In Transit",
        receiver: "Mercy",
        amount: 3000,
        paid: true,
      },
      {
        trackingId: "MAF-100-234-292",
        pickUpFrom: "Lagos, Nigeria",
        processingTime: "10 hours",
        deliveryTo: "Oyo Nigeria",
        sender: "Bunmi Tanny",
        receiver: "Mercy",
        status: "Delayed",
        amount: 3000,
        paid: false,
      },
      {
        trackingId: "MAF-100-234-293",
        pickUpFrom: "Lagos, Nigeria",
        processingTime: "10 hours",
        deliveryTo: "Oyo Nigeria",
        sender: "Bunmi Tanny",
        status: "Cancelled",
        receiver: "Mercy",
        amount: 3000,
        paid: false,
      },
    ],
  });
});

export default router;
