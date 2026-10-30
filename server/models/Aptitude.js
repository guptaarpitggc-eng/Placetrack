const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  category: { type: String, required: true, maxlength: 100 },
  attempted: { type: Number, default: 0, min: 0 },
  correct: { type: Number, default: 0, min: 0 },
  created_at: { type: Date, default: Date.now },
});
schema.index({ user_id: 1, category: 1 }, { unique: true });
module.exports = mongoose.models.Aptitude || mongoose.model("Aptitude", schema);
