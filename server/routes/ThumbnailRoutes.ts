import express from "express";

// Thumbnail-related controller functions
import {
    deleteThumbnail,
    generateThumbnail,
} from "../controllers/ThumbnailController.js";

// Middleware to ensure user is authenticated
import protect from "../middlewares/auth.js";

// Create thumbnail router
const ThumbnailRouter = express.Router();

// Generate a new AI thumbnail (protected route)
ThumbnailRouter.post("/generate", protect, generateThumbnail);

// Delete a thumbnail by ID (protected route)
ThumbnailRouter.delete("/delete/:id", protect, deleteThumbnail);

export default ThumbnailRouter;