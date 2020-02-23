const mongoose = require('mongoose')

const connectDB = async () =>{
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex:true,
      useFindAndModify:false
    })
    console.log(`MongoDB connects to ${connect.connections[0].host} port:${connect.connections[0].port} on ${connect.connections[0].name} database `)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }

}

module.exports = connectDB