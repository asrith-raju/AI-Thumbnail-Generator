import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import axios from "axios";
import imagekit from "../configs/imagekit.js";
import { generateImagePrompt } from "../utils/generateImagePrompt.js";

// Controller to generate a new AI thumbnail
export const generateThumbnail = async (req: Request, res: Response) => {
    let thumbnail: any;

    try {
        const userId = req.session.userId;

        // Extract thumbnail generation inputs
        const {
            title,
            prompt: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
        } = req.body;

        // Validate required data
        if (!userId || !title) {
            return res.json({
                success: false,
                message: "Missing details",
            });
        }

        // Create initial thumbnail record (generation in progress)
        thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true,
        });

        // Generate refined AI prompt using Gemini
        const finalPrompt = await generateImagePrompt({
            title,
            style,
            aspect_ratio,
            color_scheme,
            user_prompt,
            text_overlay,
        });

        // Encode prompt for safe URL usage
        const encodedPrompt = encodeURIComponent(finalPrompt);

        // Generate image using ImageKit AI endpoint
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/thumbnails/${Date.now()}.png?tr=w=1280,h=720`;

        // Fetch generated image as binary data
        const imageResponse = await axios.get<ArrayBuffer>(
            generatedImageUrl,
            { responseType: "arraybuffer" }
        );

        // Convert image to Base64 for upload
        const base64Image = `data:image/png;base64,${Buffer.from(
            imageResponse.data
        ).toString("base64")}`;

        // Upload image to ImageKit
        const uploadResult = await imagekit.upload({
            file: base64Image,
            fileName: `thumbnail-${Date.now()}.png`,
            folder: "thumbnails",
        });

        // Update thumbnail record with final data
        thumbnail.image_url = uploadResult.url;
        thumbnail.prompt_used = finalPrompt;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        return res.json({
            success: true,
            message: "Thumbnail generated successfully",
            thumbnail,
        });
    } catch (error: any) {
        console.error(error);

        // Mark generation as failed if thumbnail record exists
        if (thumbnail) {
            thumbnail.isGenerating = false;
            await thumbnail.save();
        }

        return res.status(500).json({
            success: false,
            message: "Image generation failed",
            error: error.message,
        });
    }
};

// Controller to delete a thumbnail
export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userId } = req.session;

        // Delete thumbnail belonging to the logged-in user
        await Thumbnail.findByIdAndDelete({ _id: id, userId });

        res.json({ message: "Thumbnail deleted successfully" });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};