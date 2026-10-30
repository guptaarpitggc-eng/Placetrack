const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  text: { type: String, required: true, trim: true, maxlength: 200 },
  done: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.models.Task || mongoose.model("Task", schema);
