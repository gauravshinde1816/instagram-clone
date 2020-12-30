const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
//@GET Route to display all the posts

router.get("/createpost", (req, res) => {
  console.log(req.user);
  res.send("Routes sent");
});

//@POST route to Create post

router.post("/createpost", auth, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(422).json({ msg: "Enter the credebtials" });
  }
  console.log(req.user);
  res.send("Routes sent");
});

module.exports = router;
