import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    prompt: {
      type: String,
    },
    geminiResponse: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Prompt = mongoose.model('Prompt', PromptSchema);
export default Prompt;