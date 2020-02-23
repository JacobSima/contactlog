const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Contact = require('../models/Contact')
const {check,validationResult} = require('express-validator')
const auth = require('../middleware/auth')

// @route   Get api/contacts
// @desc    Get all users contacts of the User
// @access  Private
router.get('/',[auth],async (req,res)=>{
  try {
    const contacts =  await Contact.find({user:req.user.id}).sort({date:-1})
    res.status(200).json({contacts})
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})


// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/',[auth,[
  check('name','Name is required').not().isEmpty()
]],async (req,res)=>{

  const errors = validationResult(req)
  if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()})

  const {name,email,phone,type} = req.body
  try {
    const newContact = new Contact({
      email,phone,type,name,user:req.user.id
    })
    const contact = await newContact.save()
    res.status(200).json({contact})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Servor Error')
  }
})



// @route   UPDATE api/contacts/:id
// @desc    UPDATE contact
// @access  Private
router.put('/:id',[auth],async (req,res)=>{

  const {name,email,phone,type} = req.body
  // build contact object
  const contactFields = {}
  if(name) contactFields.name = name
  if(email) contactFields.email = email
  if(phone) contactFields.phone = phone
  if(type) contactFields.type = type
  
  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(400).json({msg:"Contact not found"})

    // make sure user owns contact
    if(contact.user.toString() !== req.user.id) return res.status(401).json({msg:'Not Authorized'})

    contact = await Contact.findByIdAndUpdate(req.params.id,{$set:contactFields},{new:true})
    res.status(200).json({contact})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Servor Error')
  }

})


// @route   DELETE api/contacts/:id
// @desc    DELETE contact
// @access  Private
router.delete('/:id',[auth],async(req,res)=>{
  try {
    let contact = await Contact.findById(req.params.id)
    if(!contact) return res.status(400).json({msg:"Contact not found"})

    // make sure user owns contact
    if(contact.user.toString() !== req.user.id) return res.status(401).json({msg:'Not Authorized'})

    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({msg:"Contact removed"})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Servor Error')
  }
})

module.exports = router