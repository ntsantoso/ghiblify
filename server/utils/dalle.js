
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function createImage(buffer) {
  const base64 = buffer.toString('base64');
  const response = await openai.images.edit({
    image: buffer,
    prompt: "Studio Ghibli anime style portrait of a person",
    n: 1,
    size: "1024x1024",
    response_format: "b64_json"
  });

  const image = response.data[0].b64_json;
  return Buffer.from(image, 'base64');
}
