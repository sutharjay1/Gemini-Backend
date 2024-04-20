import bcrypt from 'bcrypt';
import { setToken } from '../hooks/auth.js';
import User from '../models/user.model.js';

const handleUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const username = name.toLowerCase();

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const token = await setToken(user);

    res
      .status(200)
      .cookie('token', token, {
        secure: true,
        sameSite: 'None',
      })
      .json({
        message: 'User Registered successfully',
        user: { ...user, password: undefined },
      });
  } catch (error) {
    console.error('Error registering user:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while registering user' });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate('prompts').exec();

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = await setToken(user);

    res
      .status(200)
      .cookie('token', token, {
        secure: true,
        sameSite: 'None',
      })
      .json({
        message: 'Login successfully',
        user: { ...user.toObject(), password: undefined },
      });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

export { handleUserLogin, handleUserRegister };
