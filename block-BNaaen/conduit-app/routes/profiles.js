var express = require("express");
var router = express.Router();
var { verifyToken } = require("../middleware/auth");
const {
  getProfile,
  followUser,
  unFollowUser,
} = require("../controllers/profileController");

//Get Profile (Optional Authentication)
router.get("/:username", auth.authorizeOptional, getProfile);

// Protecting The Routes
router.use(verifyToken);

//Follow User (Authenticated)
router.post("/:username/follow", followUser);

//Unfollow User (Authenticated)
router.delete("/:username/follow", unFollowUser);

module.exports = router;
