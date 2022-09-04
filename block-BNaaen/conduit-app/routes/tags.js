var express = require("express");
const { allTags } = require("../controllers/tagsController");
var router = express.Router();

router.get("/", allTags);
