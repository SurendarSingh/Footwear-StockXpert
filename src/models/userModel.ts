import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [20, "Name must be at most 20 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    dropDups: true,
    trim: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "/images/avatar.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
  passwordResetToken: String,
  passwordResetTokenExpiry: Date,

  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
