import gemini from "../configs/gemini.js";

interface PromptInput {
    title: string;
    style?: string;
    aspect_ratio?: string;
    color_scheme?: string;
    user_prompt?: string;
    text_overlay?: string;
}

export const generateImagePrompt = async ({
    title,
    style,
    aspect_ratio,
    color_scheme,
    user_prompt,
    text_overlay,
}: PromptInput): Promise<string> => {
    const completion = await gemini.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
            {
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

    return completion.choices[0].message.content!.trim();
};