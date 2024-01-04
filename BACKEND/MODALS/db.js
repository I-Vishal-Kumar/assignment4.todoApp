const mongoose = require("mongoose");

let schema = mongoose.Schema;

let user = new schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
});

let todo = new schema({
  user_name: { type: String, required: true },
  heading: { type: String, required: true },
  id: { type: Number },
  content: { type: String, require: true },
  status: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

todo.pre("save", (next) => {
  this.updated_at = new Date();
  next();
});

let USER = new mongoose.model("users", user);
let TODO = new mongoose.model("todos", todo);

module.exports = { USER, TODO };
