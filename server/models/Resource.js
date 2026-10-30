const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  category: { type: String, default: "DSA", maxlength: 50 },
  resource_type: { type: String, default: "Website", maxlength: 30 },
  url: { type: String, required: true, maxlength: 1000 },
  description: { type: String, default: "", maxlength: 500 },
  created_at: { type: Date, default: Date.now, index: true },
});
module.exports = mongoose.models.Resource || mongoose.model("Resource", schema);
