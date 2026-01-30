import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import axios from "axios";
import imagekit from "../configs/imagekit.js";
import { generateImagePrompt } from "../utils/generateImagePrompt.js";

export const generateThumbnail = async (req: Request, res: Response) => {
  let thumbnail: any;

  try {
    const userId = req.session.userId;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    if (!userId || !title) {
      return res.json({ success: false, message: "Missing details" });
    }

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

    const finalPrompt = await generateImagePrompt({
      title,
      style,
      aspect_ratio,
      color_scheme,
      user_prompt,
      text_overlay,
    });

    const encodedPrompt = encodeURIComponent(finalPrompt);

    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/thumbnails/${Date.now()}.png?tr=w=1280,h=720`;

    const imageResponse = await axios.get<ArrayBuffer>(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    const base64Image = `data:image/png;base64,${Buffer.from(
      imageResponse.data
    ).toString("base64")}`;

    const uploadResult = await imagekit.upload({
      file: base64Image,
      fileName: `thumbnail-${Date.now()}.png`,
      folder: "thumbnails",
    });

    thumbnail.image_url = uploadResult.url;
    thumbnail.prompt_used = finalPrompt;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    return res.json({
      success: true,
      message: "Thumbnail generated successfully",
      thumbnail,
    });
  } 
  catch (error: any) {
    console.error(error);

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

//controller to delete a thumbnail
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    await Thumbnail.findByIdAndDelete({ _id: id, userId })

    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
