const jwt = require("jsonwebtoken");
const prisma = require("../config/db");

const protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user and attach to request (exclude password)
    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { protect };
