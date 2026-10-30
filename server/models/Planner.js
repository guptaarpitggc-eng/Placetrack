const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  day: { type: String, required: true, maxlength: 15 },
  subject: { type: String, required: true, trim: true, maxlength: 100 },
  duration: { type: String, required: true, maxlength: 30 },
  created_at: { type: Date, default: Date.now },
});
module.exports = mongoose.models.Planner || mongoose.model("Planner", schema);
