import { HfInference } from "@huggingface/inference";

const HF_TOKEN = process.env.REACT_APP_HF_TOKEN;
const hf = new HfInference(HF_TOKEN);
const MODEL = "stabilityai/stable-diffusion-2";

export const generateImage = async (prompt) => {
  try {
    const result = await hf.textToImage({ model: MODEL, inputs: prompt });
    return result[0].image;
  } catch (err) {
    console.error("Error generating image:", err);
    throw err;
  }
};
