const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  done: { type: Number, default: 0, min: 0 },
  total: { type: Number, required: true, min: 1, max: 200 },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.models.Subject || mongoose.model("Subject", schema);
