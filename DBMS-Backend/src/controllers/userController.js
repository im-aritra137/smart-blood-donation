import { prisma } from "../database/prisma.js";
import { z } from "zod";

export const getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                bloodGroup: true,
                role: true,
                latitude: true,
                longitude: true,
                isAvailable: true,
            },
        });

        res.json({
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const { isAvailable } = req.body;

        const user = await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                isAvailable,
            },
        });

        res.json({
            message: "Availability updated",
            isAvailable: user.isAvailable,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const updateLocation = async (req, res) => {
    try {
        const schema = z.object({
            latitude: z.number(),
            longitude: z.number(),
        });

        const { success, data, error } = schema.safeParse(req.body);

        if (!success) {
            return res.status(400).json({ message: 'Validation failed', data: z.flattenError(error) });
        }

        const user = await prisma.user.update({
            where: {
                id: req.user.id,
            },
            data: {
                latitude: data.latitude,
                longitude: data.longitude,
            },
        });

        res.json({
            message: "Location updated",
            latitude: user.latitude,
            longitude: user.longitude,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const searchAvailableDonors = async (req, res) => {
    try {
        const querySchema = z.object({
            bloodGroup: z.string().optional(),
            role: z.string().optional(),
        });

        const { success, data, error } = querySchema.safeParse(req.query);

        if (!success) {
            return res.status(400).json({ message: 'Validation failed', data: z.flattenError(error) });
        }

        const where = {
            isAvailable: true,
            role: 'DONOR',
            bloodGroup: data.bloodGroup ?? undefined,
        };

        const donors = await prisma.user.findMany({
            where,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                bloodGroup: true,
                role: true,
                latitude: true,
                longitude: true,
                isAvailable: true,
            },
        });

        res.json({
            status: 'success',
            message: 'Available donors fetched successfully',
            data: { donors },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
