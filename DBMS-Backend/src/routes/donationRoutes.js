import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    createDonation
} from "../controllers/donationController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createDonation
);

export default router;
