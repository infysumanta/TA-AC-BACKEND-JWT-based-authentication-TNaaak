var express = require("express");
var router = express.Router();

var { userLogin, userRegister } = require("../controllers/userController");
// Login
router.post("/login", userLogin);

// Register
router.post("/register", userRegister);

module.exports = router;
