const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const passwordMatch = await bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
