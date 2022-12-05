const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Access denied. No token provided");
    const authToken =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.slice(7, authorization.length)
        : null;
    const decode = jwt.verify(authToken, process.env.SECRET);
    req.currentUser = decode;
    next();
  } catch (error) {
    res.status(401).json({ success: true, message: error.message });
  }
};

module.exports = auth;
