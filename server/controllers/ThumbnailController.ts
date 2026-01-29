import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from '@google/genai';
// import ai from '../configs/ai.js';
import path from 'path';
import fs from 'fs';
import {v2 as cloudinary} from 'cloudinary';
import axios from "axios";
import FormData from "form-data";

const stylePrompts = {
  'Bold and Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional design',

  'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',

  'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',

  'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',

  'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style'
};


const colorSchemeDescriptions = {
   vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',

}
 







export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const userId = req.session.userId;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay
    } = req.body;

    if (!userId || !title) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Save initial DB record
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true
    });

    // 🔹 Build prompt (same logic as before)
    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} thumbnail for "${title}".`;

    if (color_scheme) {
      prompt += ` Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`;
    }

    if (user_prompt) {
      prompt += ` Additional details: ${user_prompt}.`;
    }

    prompt += " Make it bold, professional, and click-worthy.";

    // 🔹 ClipDrop request
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY!,
          ...formData.getHeaders()
        },
        responseType: "arraybuffer"
      }
    );

    // 🔹 Convert image
    const imageBuffer = Buffer.from(data, "binary");

    // 🔹 Save locally (optional, for Cloudinary)
    const filename = `thumbnail-${Date.now()}.png`;
    const filePath = path.join("images", filename);

    fs.mkdirSync("images", { recursive: true });
    fs.writeFileSync(filePath, imageBuffer);

    // 🔹 Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image"
    });

    // 🔹 Update DB
    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    // 🔹 Cleanup
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      message: "Thumbnail generated successfully",
      thumbnail
    });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Image generation failed"
    });
  }
};


//controller to delete a thumbnail

export const deleteThumbnail = async (req:Request, res:Response) => {
    try {
        const {id} = req.params;
        const {userId} = req.session;

        await Thumbnail.findByIdAndDelete({_id:id,userId})

        res.json({message:"Thumbnail deleted successfully"});
    } catch (error :any) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}
