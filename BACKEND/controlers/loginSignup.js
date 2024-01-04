const { USER } = require("../MODALS/db");

class loginSignup {
  static SIGNUP = async (req, res) => {
    let { user_name } = req.body;
    if (!user_name)
      return res.send({ status: "err", message: "Enter a valid name" });

    try {
      user_name = user_name.trim();
      let is_created = USER.create({
        user_name,
      });
      if (is_created)
        return res.send({ status: "ok", message: "user created" });
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
      req.session.user_name = is_created.user_name;
      return res.send({ status: "ok", message: "Logged in" });
    } catch (error) {
      return res.send({
        status: "err",
        message: error?.message || "somethign went wrong",
      });
    }
  };
}

module.exports = { loginSignup };
