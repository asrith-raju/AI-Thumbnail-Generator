import { OpenAI } from "openai";

// Configure OpenAI SDK to work with Google Gemini API
const gemini = new OpenAI({
    // Gemini API key from environment variables
    apiKey: process.env.GEMINI_API_KEY,

    // OpenAI-compatible Gemini API base URL
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default gemini;