const jwt = require("jsonwebtoken");

/* ──────────────────────────────────────────────
   Middleware: protect private routes with JWT
   Reads:  Authorization: Bearer <token>
   Sets:   req.user = { _id, name, email }
────────────────────────────────────────────── */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not authorised — token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { _id, name, email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorised — invalid token" });
  }
};

module.exports = protect;
