const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema=new Schema({
  name : String,
  last_name : String,  
})


// crear modelo 
const Usuario= mongoose.model('usuarios', userSchema)

module.exports = {
  Usuario
}