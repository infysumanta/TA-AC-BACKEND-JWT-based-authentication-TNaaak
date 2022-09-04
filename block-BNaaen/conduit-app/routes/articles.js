var express = require("express");
const {
  feedArticles,
  listArticle,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  addComment,
  getCommentForArticle,
  deleteComment,
  makeFavouriteArticle,
  unFavoriteArticle,
} = require("../controllers/articleController");
var router = express.Router();
var { verifyToken, authorizeOptional } = require("../middleware/auth");

//Get Article  (Not Authenticated)
router.get("/:slug", getArticle);

router.get("/", authorizeOptional, listArticle);

//Get Comments From An Article   (Optional Authentication)
router.get("/:slug/comments", authorizeOptional, getCommentForArticle);

app.use(verifyToken);
// Feed Articles  (Authenticated)
router.get("/feed", feedArticles);

//Create Article  (Authenticated)
router.post("/", createArticle);

//Update Article  (Authenticated)
router.put("/:slug", updateArticle);

//Delete Article  (Authenticated)
router.delete("/:slug", deleteArticle);

//Add Comments To An Article  (Authenticated)
router.post("/:slug/comments", addComment);

//Delete Comments  (Authenticated)
router.delete("/:slug/comments/:id", deleteComment);

//Favorite Article  (Authenticated)
router.post("/:slug/favorite", makeFavouriteArticle);

//Unfavorite Article  (Authenticated)
router.delete("/:slug/favorite", unFavoriteArticle);

module.exports = router;
