var express = require("express");
const {
  createUser,
  loginUser,
  dashboardResponse,
} = require("../controllers/userController");

var { verifyToken } = require("./../middleware/auth");

var router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);
router.get("/dashboard", verifyToken, dashboardResponse);

module.exports = router;
