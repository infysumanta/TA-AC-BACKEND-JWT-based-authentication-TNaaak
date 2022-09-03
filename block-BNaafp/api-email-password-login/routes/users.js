var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/register", async function (req, res, next) {
  try {
    var user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

router.get("/login", async function (req, res, next) {
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
    console.log(user, result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
