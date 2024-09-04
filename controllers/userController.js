const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).send({
        message: "Please fill all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({
        message: "User with this email is Already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(200).send({
      success: true,
      message: "Account created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while Register a User",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).send({
        message: "Please fill all fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: "Invalid Credentials",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({
        message: "Invalid Credentials",
        success: false,
      });
    }
    if (role !== user.role) {
      return res.status(400).send({
        message: "User doesn't exists with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .send({
        message: `welcome back ${user.fullname}`,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while Login a User",
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).send({
      message: "Logged out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while Logout a User",
      success: false,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, skills, bio } = req.body;
    const file = req.file;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "user not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(200).send({
      message: "Profile updated Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong while Update User Profile",
      success: false,
    });
  }
};
