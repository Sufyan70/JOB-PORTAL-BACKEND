const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      profilePhoto: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
