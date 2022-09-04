var Article = require("../models/Article");

module.exports = {
  allTags: async (req, res, next) => {
    try {
      var allTags = await Article.distinct("tagList");
      res.status(200).json({ allTags });
    } catch (error) {
      next(error);
    }
  },
};
