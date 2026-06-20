const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "no token provided" });
    }

    const token = authHeader.split(" ")[1];

    console.log("HEADER:", authHeader);
    console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "not authorised" });
  }
};

module.exports = { protect };
