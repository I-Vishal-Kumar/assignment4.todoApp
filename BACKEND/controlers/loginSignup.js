const { USER } = require("../MODALS/db");
const JWT = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
class loginSignup {
  static SIGNUP = async (req, res) => {
    let { user_name } = req.body;
    if (!user_name)
      return res.send({ status: "err", message: "Enter a valid name" });

    try {
      user_name = user_name.trim();
      // GENERATE THE ACCESS TOKEN AND REFRESH TOKEN
      const access_token = JWT.sign({ user_id }, ACCESS_SECRET, {
        expiresIn: "10m",
      });
      const refresh_token = JWT.sign({ user_name }, REFRESH_SECRET, {
        expiresIn: "1d",
      });
      let is_created = await USER.create({
        user_name,
        refreshToken: refresh_token,
      });
      res.cookie("jwt", refresh_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      if (is_created)
        return res.send({
          status: "ok",
          message: "user created",
          access_token,
        });
      return res.send({ status: "err", message: "something went wrong" });
    } catch (error) {
      if (error?.code === 11000) {
        return res.status(409).json({
          status: "err",
          message: `${
            Object.keys(error?.keyPattern)[0] || "field"
          } already exist`,
        });
      }
      return res
        .status(409)
        .json({ status: "err", message: "somehing went wrong" });
    }
  };

  static LOGIN = async (req, res) => {
    let { user_name } = req.body;
    if (!user_name)
      return res.send({ status: "err", message: "Enter a valid user name" });

    try {
      let is_created = await USER.findOne({ user_name });
      if (!is_created) throw new Error("Enter a valid user id");
      const access_token = JWT.sign(
        { user_name: is_created.user_name },
        ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const refresh_token = JWT.sign(
        { user_name: is_created.user_name },
        REFRESH_SECRET,
        { expiresIn: "1d" }
      );
      await USER.findOneAndUpdate(
        { user_name: is_created.user_name },
        {
          refreshToken: refresh_token,
        }
      );
      return res.send({ status: "ok", message: "Logged in", access_token });
    } catch (error) {
      return res.send({
        status: "err",
        message: error?.message || "somethign went wrong",
      });
    }
  };
}

module.exports = { loginSignup };
