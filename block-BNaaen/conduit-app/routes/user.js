var express = require("express");
const { currentUser, updateUser } = require("../controllers/userController");
var router = express.Router();
var { verifyToken } = require("../middleware/auth");

app.use(verifyToken);
// Current User
router.get("/", currentUser);
//Update User
router.put("/", updateUser);

module.exports = router;
