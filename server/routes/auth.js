const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const requireAuth = require('../middleware/auth');
const router = express.Router();
const view = u => ({ id:u.id, name:u.name, email:u.email, role:u.role });
const session = u => ({ token:jwt.sign({ id:u.id, role:u.role },process.env.JWT_SECRET,{expiresIn:'7d'}), user:view(u) });
router.post('/register', async(req,res,next)=>{
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = req.body.password;
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || typeof password !== 'string' || password.length < 10)
      return res.status(400).json({error:'Provide name, valid email, and password of at least 10 characters'});
    if (await User.findOne({where:{email}})) return res.status(409).json({error:'Email already registered'});
    const user = await User.create({name,email,passwordHash:await bcrypt.hash(password,12),role:'customer'});
    res.status(201).json(session(user));
  } catch(e){next(e);}
});
router.post('/login',async(req,res,next)=>{
  try {
    const email=String(req.body.email||'').trim().toLowerCase();
    const user=await User.findOne({where:{email}});
    if (!user || !(await bcrypt.compare(String(req.body.password||''),user.passwordHash)))
      return res.status(401).json({error:'Incorrect email or password'});
    res.json(session(user));
  } catch(e){next(e);}
});
router.get('/me',requireAuth,async(req,res,next)=>{
  try {const user=await User.findByPk(req.auth.id);if(!user)return res.status(401).json({error:'Account not found'});res.json(view(user));}catch(e){next(e);}
});
module.exports=router;
