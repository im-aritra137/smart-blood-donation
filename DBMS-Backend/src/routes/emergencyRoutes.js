import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createEmergencyRequest,
  getAllEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyStatus,
  deleteEmergencyRequest
  , findMatchingDonors
} from "../controllers/emergencyController.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createEmergencyRequest
);

router.get(
  "/",
  authMiddleware,
  getAllEmergencyRequests
);

router.get(
  "/:id/matches",
  authMiddleware,
  findMatchingDonors
);

router.get(
  "/:id",
  authMiddleware,
  getEmergencyRequestById
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateEmergencyStatus
);

router.delete(
  "/:id",
  authMiddleware,
  deleteEmergencyRequest
);

export default router;
