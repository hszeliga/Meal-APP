const { Router } = require("express");

const routes = require("express").Router();
const User = require("./userModel");
const authUser = require('./authUser');

routes.post("/users", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create(req.body);
    await user.generateToken();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

routes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    await user.generateToken(); 
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

routes.post('/auto-login',authUser, async(req, res)=>{
  res.send(req.user);
})

routes.post('/logout',authUser, async (req, res) => {
 const user = req.user;
 user.token = '';
 await user.save();
 res.status(200).send();
})

module.exports = routes;
