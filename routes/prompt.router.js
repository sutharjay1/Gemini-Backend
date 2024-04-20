import express from 'express';
import useGemini from '../hooks/useGemini.js';
import Prompt from '../models/prompt.model.js';
import User from './../models/user.model.js';

const router = express.Router();

router.post('/prompt/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, error: 'Prompt is required' });
    }

    const geminiResponse = await useGemini({ gptQuery: prompt });

    const userPrompt = await Prompt.create({
      userID,
      prompt,
      geminiResponse,
    });

    const user = await User.findByIdAndUpdate(userID, {
      $push: { prompts: userPrompt._id },
    }).populate('prompts');

    res.status(200).json({ userPrompt, user: user.toObject() });
  } catch (error) {
    console.error('Error handling prompt:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
