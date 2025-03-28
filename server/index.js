
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { createImage } from './utils/dalle.js';
import { sendEmail } from './utils/email.js';

dotenv.config();
const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.post('/api/upload', upload.single('image'), async (req, res) => {
  const { email } = req.body;
  const inputImage = req.file;

  if (!inputImage || !email) return res.status(400).send("Missing image or email");

  try {
    const resultImageBuffer = await createImage(inputImage.buffer);
    await sendEmail(email, resultImageBuffer);
    res.status(200).send("Success!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to process image.");
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
