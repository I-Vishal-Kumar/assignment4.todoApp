require("dotenv").config();
const { USER } = require("../MODALS/db");
const JWT = require("jsonwebtoken");

function authorised(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader)
    return res.status(401).json({ status: 0, message: "Login again !" });

  // authHeader = "bearer TOKEN"
  const token = authHeader;
  JWT.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
    if (err)
      return res.status(403).json({ status: "err", message: "invalid token" });
    let is_valid_user = await USER.findOne({ user_name: decoded?.user_name });
    if (is_valid_user) {
      req.user_name = decoded.user_name;
      next();
    } else {
      return res
        .status(500)
        .json({ status: "logout", message: "Login again!" });
    }
  });
}

module.exports = { authorised };
