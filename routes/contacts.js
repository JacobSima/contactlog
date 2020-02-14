const express = require('express')
const router = express.Router()

// @route   Get api/contacts
// @desc    Get all users contacts of the User
// @access  Private
router.get('/',(req,res)=>{
  res.send('Get mu own all contacts')
})


// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/',(req,res)=>{
  res.send('Add new Contact')
})



// @route   UPDATE api/contacts/:id
// @desc    UPDATE contact
// @access  Private
router.put('/:id',(req,res)=>{
  res.send('update Contact')
})


// @route   DELETE api/contacts/:id
// @desc    DELETE contact
// @access  Private
router.delete('/:id',(req,res)=>{
  res.send('Delete contact')
})

module.exports = router