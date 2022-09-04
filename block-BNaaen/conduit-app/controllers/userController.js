const User = require("../models/User");

let userLogin = async (req, res, next) => {
  const { email, password } = req.body.user;
  if (!email || !password) {
    return res.status(400).json({ error: " Email or Password is missing." });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: " Email not registered." });
    }
    var result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: "Password is wrong." });
    }
    var token = await user.signToken();
    res.status(200).json({ user: user.userJSON(token) });
  } catch (error) {
    return error;
  }
};
let userRegister = async (req, res, next) => {
  try {
    var user = await User.create(req.body.user);
    res
      .status(200)
      .json({ name: user.name, message: "registered successfully" });
  } catch (error) {
    if (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: "This Email is already registered..." });
      }
      if (error.name === "ValidationError") {
        return res
          .status(400)
          .json({ error: "Enter a valid and strong Password..." });
      }
    }
  }
};

let currentUser = async (req, res, next) => {
  let id = req.user.userId;
  try {
    let user = await User.findById(id);
    res.status(200).json({ user: user.displayUser(id) });
  } catch (error) {
    next(error);
  }
};
let updateUser = async (req, res, next) => {
  let id = req.user.userId;
  try {
    user = await User.findByIdAndUpdate(id, req.body.user, { new: true });
    return res.status(201).json({ user: user.displayUser(id) });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  userLogin,
  userRegister,
  currentUser,
  updateUser,
};
