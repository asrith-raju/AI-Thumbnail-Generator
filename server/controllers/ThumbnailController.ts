import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';


export const generateThumbnail = async (req:Request, res:Response) => {
     try {
        const userId = req.session.userId;
        const {title,prompt:user_prompt,style,aspect_ratio,color_scheme,text_overlay} = req.body;
        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used:user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay ,
            isGenerating:true
        })
         
     } catch (error) {
        
     }
}