const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth');
const User = require("../models/user");
const { Podcast } = require('../models/podcast');
userRouter.post("/api/add-to-library", auth, async (req, res) => {
    try {
      const { id } = req.body;
      const podcast = await Podcast.findById(id);
      let user = await User.findById(req.user);
      user.library.push({ podcast});
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

module.exports = userRouter;