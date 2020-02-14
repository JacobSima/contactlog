const express = require('express')
const router = express.Router()

// @route   Get api/auth
// @desc    Get Logged User
// @access  Private
router.get('/',(req,res)=>{
  res.send('Get Logged User')
})


// @route   POST api/auth 
// @desc    Auth User & get token
// @access  Public
router.post('/',(req,res)=>{
  res.send('Log in User')
})






module.exports = router