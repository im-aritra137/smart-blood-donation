import express from "express";
import {
    getProfile,
    updateAvailability,
    updateLocation,
    searchAvailableDonors,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

router.patch(
    "/availability",
    authMiddleware,
    updateAvailability
);

router.patch(
    "/location",
    authMiddleware,
    updateLocation
);

router.get(
    "/search",
    authMiddleware,
    searchAvailableDonors
);

export default router;
