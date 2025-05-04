const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { 
            type: String, 
            unique: true 
        },

  name: {
        type: String,
        required: true,
          },
  email: { 
            type: String, 
            required: true, 
            unique: true 
        },
  password: { 
            type: String, 
            required: true 
        },
    isProfileComplete: {
        type: Boolean,
        default: false,
    },
  role: { 
            type: String, 
            enum: ["user", "admin"], 
            default: "user" },
  credits: { 
            type: Number, 
            default: 0 
        },
  lastLogin: { 
            type: Date 
        },
  todayRewardClaimed: { 
            type: Boolean, 
            default: false 
        },
  savedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  reportedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
