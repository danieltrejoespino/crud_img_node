const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema=new Schema({
  name : String,
  // descripcion : String
})


// crear modelo 
const Usuario= mongoose.model('cats', userSchema)

module.exports = {
  Usuario
}