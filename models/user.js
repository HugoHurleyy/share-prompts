import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exist"],
  },
  username: {
    type: String,
    required: [true, "Username already exist"],
    unique: [true, "Username already exist"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);

export default User;
