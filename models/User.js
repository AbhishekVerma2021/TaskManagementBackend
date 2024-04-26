import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePasswords = async function (password) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

export default model('User', userSchema);
