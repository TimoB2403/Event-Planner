const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error("Nicht autorisiert: Token ungültig");
      res.status(401).json({ message: "Nicht autorisiert: Token ungültig" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Nicht autorisiert: Kein Token vorhanden" });
  }
};
module.exports = { protect };