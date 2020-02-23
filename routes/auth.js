const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {check,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


// @route   Get api/auth
// @desc    Get Logged User
// @access  Private
router.get('/',[auth],async(req,res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.status(200).json({user})
  } catch (error) {
    console.error(error.message)
  }
})


// @route   POST api/auth 
// @desc    Auth User & get token
// @access  Public
router.post('/',[
  check('email','Please include a valid email').isEmail(),
  check('password','Password is required').exists()
],async (req,res)=>{

  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

  const {email,password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user) return res.status(400).json({msg:'Not User found,Invalid Credentials'})

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).json({msg:'Invalid Credentials, Password Incorrect '})

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