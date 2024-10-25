import createHttpError from "http-errors";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return next(
        createHttpError(400, "Form fields missing, please fill the form")
      );
    }
    const userNameExists = await User.findOne({ username: username });
    if (userNameExists) {
      return next(
        createHttpError(400, "Username already exists, pls choose another")
      );
    }
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return next(
        createHttpError(400, "Email already exists, pls choose another")
      );
    }
    if (!userNameExists || !emailExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword,
      });
      const access_token = generateToken(user._id);
      res.status(201).json({ access_token, msg: "User signup success" });
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next(
        createHttpError(400, "Form fields missing, please fill the form")
      );
    }
    const user = await User.findOne({ username: username }).select("+password");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(createHttpError(401, "Username or password is incorrect"));
    }
    const access_token = generateToken(user._id);
    res.status(200).json({ access_token, msg: "User login success" });
  } catch (error) {
    next(error);
  }
};

export const authenticateUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
