var User = require("../models/User");

let createUser = async (req, res, next) => {
  var { email } = req.body;
  try {
    var isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }
    var user = await User.create(req.body);
    var token = await user.signToken();
    res.status(200).json({ user: await user.userJSON(token) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

let loginUser = async (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email/Password is required" });
  }
  try {
    var user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email is not Registered" });
    }
    var result = await user.verifyPassword(password);
    if (!result) {
      return res.status(400).json({ error: "Invalid Password" });
    }
    var token = await user.signToken();
    res.status(200).json({ user: await user.userJSON(token) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

let dashboardResponse = (req, res, next) => {
  res.status(200).json({ message: "response from dashboard" });
};

module.exports = { createUser, loginUser, dashboardResponse };
