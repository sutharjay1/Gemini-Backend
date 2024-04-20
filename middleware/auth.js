import { verifyToken } from '../hooks/auth.js';
import User from '../models/user.model.js';

const verifyAuth = async (req, res, next) => {
  const token = req.cookies.token;

  console.log(token);

  if (!token) return null;

  const isVerified = await verifyToken(token, 'mysecretkey');
  if (!isVerified) return null;

  const userID = isVerified._id;

  const user = await User.findById(userID).populate('prompts');
  if (!user) return null;

  if (user) return res.status(200).json({ status: true, user, token: token });
  else return res.status(401).json({ status: false, navigate: '/login' });
};

export { verifyAuth };
