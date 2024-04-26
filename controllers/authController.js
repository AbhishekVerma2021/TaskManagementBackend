import jwt from 'jsonwebtoken'
import User from '../models/User.js'; 
import { jwtSecret } from '../config/config.js';

const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); // Use User model to find the user

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePasswords(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({id: user._id}, jwtSecret)
    if(user) {
       const {password , ...userRes} = user._doc
       return res.status(201).cookie('token', {token}).json({user: userRes})
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
