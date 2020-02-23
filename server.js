const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'})


// connect to DB
require('./config/db')()


const app = express()

//init middleware
app.use(express.json({extended:false}))

app.get('/',async(req,res)=> res.json({msg:'Welcome to the Contact Keeper API'}))



// Define route
app.use('/api/contacts',require('./routes/contacts'))
app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))
