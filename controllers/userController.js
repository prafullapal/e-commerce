const Users = require("../models/Users");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await Users.find({ role: "user" }).select("-password");
  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    return next({
      status: 404,
      message: `No user found with username: ${req.user}`,
    });
  }
  checkPermissions(req.user, user._id);
  res.status(200).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return next({
      status: 400,
      message: "Please provide all values",
    });
  }
  const user = await Users.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(200).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return next({
      status: 400,
      message: "Please provide both values",
    });
  }
  const user = await Users.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    return next({
      status: 403,
      message: "Invalid Credentials",
    });
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "Success! Password Updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
