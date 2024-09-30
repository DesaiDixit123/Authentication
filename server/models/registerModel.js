// import { Schema, model } from "mongoose";

// const registerSchema = Schema({
//   fullname: { type: String },
//   username: { type: String },
//   pass: { type: String },
//   email: { type: String },
//   isAuth: { type: Boolean, default: false },
//   token: { type: String, default: "Not Login" }
// })

// export const $userModel = model('user', registerSchema)



const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAuth: { type: Boolean, default: false },
  token: { type: String, default: "Not Login" }
});

const $userModel = mongoose.model('User', registerSchema);

module.exports = { $userModel };
