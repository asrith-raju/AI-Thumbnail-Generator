// Import the configured Gemini client
import gemini from "../configs/gemini.js";

// Input structure for generating an image prompt
interface PromptInput {
    title: string;              // Video title (must be preserved in the thumbnail)
    style?: string;             // Thumbnail style (e.g., bold, graphic, minimal)
    aspect_ratio?: string;      // Aspect ratio (e.g., 16:9)
    color_scheme?: string;      // Color preference for the thumbnail
    user_prompt?: string;       // Additional user instructions
    text_overlay?: string;      // Text overlay preference
}

// Generates a refined image generation prompt using Gemini
export const generateImagePrompt = async ({
    title,
    style,
    aspect_ratio,
    color_scheme,
    user_prompt,
    text_overlay,
}: PromptInput): Promise<string> => {

    // Send prompt instructions to Gemini chat completion API
    const completion = await gemini.chat.completions.create({
        model: "gemini-2.5-flash", // Fast and cost-efficient Gemini model
        messages: [
            {
                // System message defines AI behavior and rules
                role: "system",
                content:
                    `You are an expert YouTube thumbnail designer.
                        Generate ONE clear, high-quality image generation prompt.

                        Rules:
                        - The thumbnail must be visually clear, bold, and click-worthy.
                        - Preserve the exact video title text and include it prominently as readable on-image text.
                        - Focus on a single strong visual concept with a clear foreground subject.
                        - Use concrete visual instructions (no abstract wording).
                        - Ensure high contrast and clean composition suitable for YouTube thumbnails.

                        Return ONLY the final image generation prompt. Do not add explanations.
                    `,
            },
            {
                // User message provides dynamic thumbnail details
                role: "user",
                content: `
                    Title: ${title}
                    Style: ${style || "modern"}
                    Aspect Ratio: ${aspect_ratio || "16:9"}
                    Color Scheme: ${color_scheme || "auto"}
                    Text Overlay: ${text_overlay || "none"}
                    Extra Instructions: ${user_prompt || "none"}

                    Return ONLY the final image prompt.
                `,
            },
        ],
    });

    // Extract and return the final generated prompt
    return completion.choices[0].message.content!.trim();
};