const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  signupSchema,
  validationError,
} = require("../middlewares/validation.middleware");
const userModel = require("../models/user.model");

exports.signup = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, password } = req.body;

  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    validationError(res, result);
  }

  const existingUser = await userModel.findOne({
    username: username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await userModel.create({
    username,
    password: hash,
    firstName,
    lastName,
  });
  const userId = user._id;
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  res.status(201).json({
    message: "User created successfully",
    token,
  });
});
