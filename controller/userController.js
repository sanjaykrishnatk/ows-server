const AWS = require("aws-sdk");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
AWS.config.update({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET,
  region: "ap-southeast-2",
});

const rekognition = new AWS.Rekognition();

exports.ageController = async (req, res) => {
  console.log(`request recieved`);
  const { image } = req.body;
  const base64Image = image.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(base64Image, "base64");
  const params = {
    Image: {
      Bytes: buffer,
    },
    Attributes: ["ALL"],
  };
  const response = await rekognition.detectFaces(params).promise();
  console.log(response.FaceDetails[0].AgeRange);
  res.status(200).json(response.FaceDetails[0].AgeRange);
};

exports.registerController = async (req, res) => {
  const { name, age, email, phone, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json(`User already exists`);
      console.log(existingUser);
    } else {
      const newUser = new users({
        name,
        age,
        email,
        phone,
        password,
      });
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`Registration failed due to ${err}`);
  }
};

exports.loginController = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const existingUser = await users.findOne({ phone, password });
    if (existingUser) {
      const token = jwt.sign({ userId: existingUser._id }, "ows123");
      console.log(token, existingUser);
      res.status(200).json({ existingUser, token });
    } else {
      res.status(400).json(`Invalid email or password`);
    }
  } catch (error) {
    res.status(406).json(error);
  }
};
exports.addressController = async (req, res) => {
  const { id } = req.params;
  const { address } = req.body;
  try {
    const updatedUser = await users.findByIdAndUpdate(
      { _id: id },
      { address },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(401).json(`Something went wrong.`);
  }
};

exports.getAllUserController = async (req, res) => {
  try {
    const result = await users.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json(`Something went wrong ${err}`);
  }
};
