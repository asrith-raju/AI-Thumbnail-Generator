import mongoose from "mongoose";

// TypeScript interface describing a Thumbnail document
export interface IThumbnail extends Document {
    _id: string;                       // Unique thumbnail ID
    userId: string;                    // Reference to the user who created it
    title: string;                     // Video title used for thumbnail
    description?: string;              // Optional description
    style:                             
        | "Bold & Graphic"
        | "Tech/Futuristic"
        | "Minimalist"
        | "Photorealistic"
        | "Illustrated";               // Visual style of the thumbnail
    aspect_ratio?: "16:9" | "1:1" | "9:16"; // Thumbnail aspect ratio
    color_scheme?:                     
        | "vibrant"
        | "sunset"
        | "forest"
        | "neon"
        | "purple"
        | "monochrome"
        | "ocean"
        | "pastel";                    // Preferred color scheme
    text_overlay?: boolean;            // Whether text is overlaid on the image
    image_url?: string;                // Final generated image URL
    prompt_used?: string;              // Final AI prompt used to generate image
    user_prompt?: string;              // Additional user-provided instructions
    isGenerating?: boolean;            // Indicates generation is in progress
    createdAt?: Date;                  // Creation timestamp
    updatedAt?: Date;                  // Last update timestamp
}

// Mongoose schema definition for Thumbnail
const ThumbnailSchema = new mongoose.Schema<IThumbnail>({
    // User who owns the thumbnail
    userId: {
        type: String,
        ref: "User",
        required: true,
    },

    // Thumbnail title (trimmed)
    title: {
        type: String,
        trim: true,
        required: true,
    },

    // Optional description
    description: {
        type: String,
        trim: true,
    },

    // Visual style selection
    style: {
        type: String,
        required: true,
        enum: [
            "Bold & Graphic",
            "Tech/Futuristic",
            "Minimalist",
            "Photorealistic",
            "Illustrated",
        ],
    },

    // Aspect ratio of the thumbnail
    aspect_ratio: {
        type: String,
        required: true,
        enum: ["16:9", "1:1", "9:16"],
        default: "16:9",
    },

    // Color scheme preference
    color_scheme: {
        type: String,
        required: true,
        enum: [
            "vibrant",
            "sunset",
            "forest",
            "neon",
            "purple",
            "monochrome",
            "ocean",
            "pastel",
        ],
    },

    // Whether to include text overlay
    text_overlay: {
        type: Boolean,
        default: false,
    },

    // URL of the generated thumbnail image
    image_url: {
        type: String,
        default: " ",
    },

    // AI prompt actually used for image generation
    prompt_used: {
        type: String,
    },

    // Extra instructions provided by the user
    user_prompt: {
        type: String,
    },

    // Flag indicating image generation status
    isGenerating: {
        type: Boolean,
        default: true,
    },
});

// Prevent model re-compilation during hot reloads
const Thumbnail =
    mongoose.models.Thumbnail ||
    mongoose.model<IThumbnail>("Thumbnail", ThumbnailSchema);

export default Thumbnail;