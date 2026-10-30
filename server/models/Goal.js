const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  period: { type: String, required: true, maxlength: 50 },
  progress: { type: String, default: "Pending", maxlength: 50 },
  done: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.models.Goal || mongoose.model("Goal", schema);
