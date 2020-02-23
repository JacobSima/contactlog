const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @route   POST api/users
// @desc    Register a User
// @access  Public 
router.post('/',[
  check('name','Please add name').not().isEmpty(),
  check('email','Please include a valid emial').isEmail(),
  check('password','Please enter a password with 6 or more characters').isLength({min:6})
],async (req,res)=>{

  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

  try {
    
  let user = await User.findOne({email:req.body.email})
  if(user) return res.status(400).json({msg:'User already exists'})

  const{name,email,password} = req.body

  user = new User ({name,email,password})
  const salt = await bcrypt.genSalt(10)

  user.password = await bcrypt.hash(req.body.password,salt)
  await user.save()

  const payload ={
    user:{id:user.id}
  }

  const token = await jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:360000})
  res.send(token)

  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
  
  
})






module.exports = router