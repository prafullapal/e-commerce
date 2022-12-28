const Users = require("../models/Users");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

const getAllUsers = async (req, res, next) => {
  try {
    console.log(req.user);
    const users = await Users.find({ role: req.query.role }).select(
      "-password"
    );
    res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.params.id }).select(
      "-password"
    );
    if (!user) {
      return next({
        status: 404,
        message: `No user found with username: ${req.user}`,
      });
    }
    checkPermissions(req.user, user._id);
    res.status(200).json({ user });
  } catch (err) {
    return next(err);
  }
};
//why do i have this....meaning less
//taking and sending the data from the request.
const showCurrentUser = async (req, res, next) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
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
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
