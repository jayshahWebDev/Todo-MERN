const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) throw new Error("All filed is required");

    let userExists = await User.findOne({ email });
    if (userExists) throw new Error("Email already exists");

    let encPassword = await bcrypt.hash(password, 10);

    let newUser = new User({
      name,
      email,
      password: encPassword,
    });
    await newUser.save();

    let token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      success: true,
      message: "User Created SuccessFully",
      token,
      userDetail: {
        name,
      },
    });
  } catch (error) {
    console.log("signup Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let findUser = await User.findOne({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const token = jwt.sign({ id: findUser._id }, process.env.SECRET);

      findUser.password = undefined;
      res.status(200).json({
        success: true,
        token,
        userDetail: {
          name: findUser.name,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid Credantials",
      });
    }
  } catch (error) {
    console.log("login Error::", error.message);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
