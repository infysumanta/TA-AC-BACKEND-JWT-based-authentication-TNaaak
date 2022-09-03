var express = require("express");
const {
  createUser,
  loginUser,
  userDashboard,
} = require("../controllers/userController");

var { verifyToken } = require("../middleware/auth");

var router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);
router.get("/", verifyToken, userDashboard);

module.exports = router;
