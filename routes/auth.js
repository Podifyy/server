const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try{
    const { name, email, password } = req.body;
  const exsistingUser = await User.findOne({ email });
  if (exsistingUser) {
    return res.status(400).json({msg:"User with same email already exsist"});
  }

  let user = new User({
    email,
    password,
    name
  });
  user = await user.save();
  res.json(user);
  }
  catch(e){
    res.status(500).json({error: e.message});
  }
});

authRouter.post("/api/signin", async (req, res) =>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json( {msg: "User with email does nor exist"} );
    }
    const isMatch = password == user.password;
    if(!isMatch){
      return res.status(400).json({msg: "Password is incorrect"});
    }
    const token = jwt.sign({id: user._id}, "passwordKey", );
    res.json({token, ...user._doc})
  } catch(e){
    res.status(500).json({error: e.message});
  }

});

authRouter.post("/tokenisvalid", async (req, res) =>{
  try{
    const token = req.header("x-auth-token");
    if(!token) return res.json(false);
    if(token == 'null') return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if(!verified) return res.json(false);
    const user = User.findById(verified.id);
    if(!user) return res.json(false);
    res.json(true);
  } catch(e){
    res.status(500).json({error: e.message});
  }

});

authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({...user._doc, token: req.token});
})

module.exports = authRouter;
