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
    console.log("newUser::", newUser._id);

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
      console.log("inside if");
      const token = jwt.sign({ id: findUser._id }, process.env.SECRET);

      findUser.password = undefined;

      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };
      res
        .status(200)
        .cookie("todoToken", token, options)
        .json({
          success: true,
          token,
          userDetail: {
            name: findUser.name,
          },
        });
    } else {
      console.log("inside else");
      res.status(400).json({
        success: false,
        message: "Email or Password incorrect",
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
