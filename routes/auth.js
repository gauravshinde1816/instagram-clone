const express = require("express");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const router = express.Router();
const auth = require("../middleware/auth");

//sample protected route
router.get("/protected", auth, (req, res) => {
  res.send("Protected routes");
});

//register route
router.post(
  "/signup",
  [
    check("name", "Please enter the name").not().isEmpty(),
    check("email", "Please enter the email").isEmail(),
    check(
      "password",
      "Please enter the password with character with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      } else {
        user = new User({
          name,
          password,
          email,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json({ msg: "Sucessfully posted" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

//login route
router.post(
  "/signin",
  [
    check("email", "Please enter the email").isEmail(),
    check(
      "password",
      "Please enter the password with 6 or more character"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid username or password" });
      }

      //sending the json token
      jwt.sign({ _id: user._id }, JWT_SECRET, (error, token) => {
        if (error) {
          console.log(error.message);
        } else {
          res.json({ token });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
