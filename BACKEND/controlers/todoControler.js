const { TODO } = require("../MODALS/db");

class todoControler {
  static create_todo = async (req, res) => {
    if (!req?.session?.user_name)
      return res.status(401).json({ status: 0, message: "Login again" });
    const user_name = req?.session?.user_name;
    try {
      let { heading, content, id } = req.body;

      if (!heading || !content) throw new Error("Enter all the details");
      if (heading?.length > 20 || content?.length > 200)
        throw new Error("Text length exeeded , keep text within limits");

      heading = heading.trim();
      //   check if this heading exists
      // let heading_exists = await TODO.findOne({ user_name, heading });
      // if (heading_exists) throw new Error("heading already exists");
      let response;
      if (id === 0) {
        response = await TODO.create({
          heading,
          content,
          id: id === 0 ? Math.floor(Math.random() * 9000 + 1000) : id,
          user_name: req.session.user_name,
        });
      } else {
        response = await TODO.findOneAndUpdate(
          { user_name, id },
          {
            heading,
            content,
            user_name: req.session.user_name,
          }
        );
        if (!response) {
          throw new Error("Id does not exist");
        }
      }
      if (!response) {
        return res.send({ status: "err", message: "something went wrong" });
      }
      return res.send({ status: "ok", message: "todo created" });
    } catch (error) {
      return res.send({
        status: "err",
        message: error?.message || "something went wrong",
      });
    }
  };

  static get_todo = async (req, res) => {
    if (!req?.session?.user_name)
      return res.status(401).json({ status: 0, message: "Login again" });
    const user_name = req.session.user_name;
    try {
      let response = await TODO.find({ user_name }, { _id: 0 });
      if (!response) throw new Error("no todo found");
      return res.send({ status: "ok", data: response });
    } catch (error) {
      return res.send({
        status: "err",
        message: error?.message || "something went wrong",
      });
    }
  };

  static delete_todo = async (req, res) => {
    if (!req?.session?.user_name)
      return res.status(401).json({ status: 0, message: "Login again" });
    const user_name = req.session.user_name;
    let { id } = req.body;
    if (!id)
      return res.send({ status: "err", message: "something went wrong" });

    try {
      let response = await TODO.findOneAndDelete({ user_name, id });
      if (!response) throw new Error("no todo found");
      return res.send({ status: "ok", message: "todo deleted" });
    } catch (error) {
      return res.send({
        status: "err",
        message: error?.message || "something went wrong",
      });
    }
  };
}

module.exports = { todoControler };
