var jwt = require("jsonwebtoken");
module.exports = {
  verifyToken: async (req, res, next) => {
    var token = await req.headers.authorization;
    try {
      if (token) {
        var payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
      } else {
        return res.status(401).json({ error: "Authentication failed" });
      }
    } catch (err) {
      next(err);
    }
  },
};
