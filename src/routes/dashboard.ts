import { authenticate, AuthRequest } from '../middleware/auth';
import { Router, Response } from 'express';

const router = Router();

// GET /api/dashboard
router.get('/', authenticate, (req: AuthRequest, res: Response) => {
  const user = req.user!;

  res.json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    overview: {
      balance: 3000000.28,
      totalShipment: { count: 34, percentage: 90, vsLastMonth: 4 },
      totalExports: { count: 34, percentage: 90, vsLastMonth: 4 },
      totalImport: { count: 34, percentage: 90, vsLastMonth: 4 }
    },
    companyGrowth: [
      { month: 1, value: 200 },
      { month: 2, value: 220 },
      { month: 3, value: 280 },
      { month: 4, value: 250 },
      { month: 5, value: 300 },
      { month: 6, value: 280 },
      { month: 7, value: 350 },
      { month: 8, value: 500 },
      { month: 9, value: 520 },
      { month: 10, value: 600 },
      { month: 11, value: 750 },
      { month: 12, value: 950 }
    ],
    recentShipments: [
      {
        trackingId: 'MAF-100-234-291',
        pickUpFrom: 'Lagos, Nigeria',
        processingTime: '10 hours',
        deliveryTo: 'Oyo Nigeria',
        sender: 'Bunmi Tanny',
        status: 'In Transit',
        receiver: 'Mercy',
        amount: 3000,
        paid: true
      },
      {
        trackingId: 'MAF-100-234-292',
        pickUpFrom: 'Lagos, Nigeria',
        processingTime: '10 hours',
        deliveryTo: 'Oyo Nigeria',
        sender: 'Bunmi Tanny',
        receiver: 'Mercy',
        status: 'Delayed',
        amount: 3000,
        paid: false
      },
      {
        trackingId: 'MAF-100-234-293',
        pickUpFrom: 'Lagos, Nigeria',
        processingTime: '10 hours',
        deliveryTo: 'Oyo Nigeria',
        sender: 'Bunmi Tanny',
        status: 'Delivered',
        receiver: 'Mercy',
        amount: 3000,
        paid: true
      }
    ]
  });
});

export default router;
