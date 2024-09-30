

const bcrypt = require('bcryptjs');
const { $userModel } = require('../models/registerModel');

const register = async (req, res) => {
  try {
    const { fullname, username, pass, conPass, email } = req.body;
console.log(req.body)
    // Check if all required fields are provided
    if (!fullname || !username || !pass || !conPass || !email) {
      return res.status(400).json({ process: false, message: "All fields are required." });
    }

    // Check password length
    if (pass.length < 6) {
      return res.status(400).json({ process: false, message: "Password must be at least 6 characters long." });
    }

    // Check if passwords match
    if (pass !== conPass) {
      return res.status(400).json({ process: false, message: "Passwords do not match!" });
    }

    // Hash the password
    const hashPass = await bcrypt.hash(pass, 10);

    // Check if the username or email already exists
    const existingUser = await $userModel.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ process: false, message: "Username or email already exists!" });
    }

    // Create and save the new user
    const newUser = new $userModel({ fullname, username, pass: hashPass, email });
    await newUser.save();

    // Respond with success
    res.status(201).json({ process: true, message: "Registration successful!", data: newUser });
  } catch (e) {
    res.status(500).json({ process: false, message: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, pass } = req.body;

    // Check if username or email and password are provided
    if ((!username && !email) || !pass) {
      return res.status(400).json({ process: false, message: "Username or email and password are required!" });
    }

    // Find the user by username or email
    const user = await $userModel.findOne({ $or: [{ username }, { email }] });

    if (!user) {
      return res.status(404).json({ process: false, message: "User not found!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(pass, user.pass);

    if (isMatch) {
      res.status(200).json({ process: true, message: "Login successful!", data: user });
    } else {
      res.status(400).json({ process: false, message: "Incorrect password!" });
    }
  } catch (e) {
    res.status(500).json({ process: false, message: e.message });
  }
};

const getUsers = async (req, res) => {
  const users = await $userModel.find({});
  res.json(users);
}

module.exports = { register, login ,getUsers};
