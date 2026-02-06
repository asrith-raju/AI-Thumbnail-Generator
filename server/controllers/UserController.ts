import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";

// Controller to get all thumbnails created by the logged-in user
export const getUserThumbnails = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;

        // Fetch user's thumbnails sorted by latest first
        const thumbnails = await Thumbnail.find({ userId }).sort({
            createdAt: -1,
        });

        res.json({ thumbnails });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// Controller to get a single thumbnail by ID
export const getThumbnailById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { id } = req.params;

        // Fetch thumbnail belonging to the logged-in user
        const thumbnail = await Thumbnail.findOne({
            _id: id,
            userId,
        });

        res.json({ thumbnail });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};