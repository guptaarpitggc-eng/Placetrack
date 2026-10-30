const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
      index: true,
    },
    password: { type: String, required: true },
    college: { type: String, default: "" },
    branch: { type: String, default: "" },
    grad_year: { type: String, default: "" },
    target_role: { type: String, default: "" },
    company_type: { type: String, default: "Product Based" },
    level: { type: String, default: "Beginner" },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
