import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from '@google/genai';
import ai from '../configs/ai.js';
import path from 'path';
import fs from 'fs';


const stylePrompts = {
  'Bold and Graphic': 'eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional design',

  'Tech/Futuristic': 'futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere',

  'Minimalist': 'minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point',

  'Photorealistic': 'photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field',

  'Illustrated': 'illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style'
};



 

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
         
     }catch(error:any){

     }
} 