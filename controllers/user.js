import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// export const getAllUsers = async (req, res) => {
//   const users = await User.find({});

//   res.json({
//     success: true,
//     users,
//   });
// };

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User alredy exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({
      success: true,
      user: req.user,
    });
};

// export const getUser = async (req, res) => {
//   // const { id } = req.body;
//   // const { id } = req.query;
//   const { id } = req.params;

//   const user = await User.findById(id);

//   res.json({
//     success: true,
//     user,
//   });
// };

// export const updateUser = async (req, res) => {
//   // const { id } = req.body;
//   // const { id } = req.query;
//   const { id } = req.params;

//   const user = await User.findById(id);

//   res.json({
//     success: true,
//     message: "Updated",
//   });
// };

// export const deleteUser = async (req, res) => {
//   // const { id } = req.body;
//   // const { id } = req.query;
//   const { id } = req.params;

//   const user = await User.findById(id);

//   // await user.remove();

//   res.json({
//     success: true,
//     message: "Deleted",
//   });
// };