var bcrypt = require("bcryptjs");
const UserModel = require("../model/UserModel");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const accountVerify = async (email) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    secureConnection: true,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL, // sender address
    to: email, // list of receivers
    subject: "E-com", // Subject line
    text: "Please verify your email address", // plain text body
    html: `<a href="http://localhost:5000/api/verify-account/${email}">Verify</a>`, // html body
  });

  if (info.messageId) {
    return true;
  } else {
    return false;
  }
};

module.exports.verifyAccount__Controller = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const updatedAccountStatus = await UserModel.findOneAndUpdate(
      { email },
      { $set: { is_verify: true } },
      { new: true }
    );

    return res.redirect("http://localhost:3000/");
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports.register__Controller = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all info" });
    }

    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    var hashPass = bcrypt.hashSync(password, 12);

    const newUser = new UserModel({ email, name, password: hashPass });
    await accountVerify(email);

    newUser
      .save()
      .then((result) => {
        // var token = jwt.sign({ _id: result._id }, process.env.SECRET_KEY);
        return res.status(201).json({
          success: "Registration success,Please verify your email",
        });
      })
      .catch((err) => {
        return res.status(400).json({ error: "Something went wrong" });
      });
  } catch (error) {
    return res.status(400).json({ error: "Something went wrong" });
  }
};

module.exports.login__Controller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all info" });
    }

    const checkEmail = await UserModel.findOne({
      email: email,
    });
    if (!checkEmail) {
      return res.status(400).json({ error: "Email does not exist" });
    }
    const checkVerifyUser = await UserModel.findOne({
      email: email,
      is_verify: false,
    });
    if (checkVerifyUser) {
      return res.status(400).json({ error: "Please verify your email" });
    }
    const checkUser = await UserModel.findOne({
      email: email,
      is_verify: true,
    });

    var hashPass = bcrypt.compareSync(password, checkUser.password);
    if (!hashPass) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    var token = jwt.sign({ _id: checkUser._id }, process.env.SECRET_KEY);
    return res.status(400).json({ success: "Login success", token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};
