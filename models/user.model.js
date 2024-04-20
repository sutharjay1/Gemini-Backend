import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    prompts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prompt',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);
export default User;
