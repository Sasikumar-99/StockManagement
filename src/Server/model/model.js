const mongoose = require('mongoose');
const Schema = mongoose.Schema
const loginSchema = new Schema({
  userName : {
    type : String
  },
  password :{
    type : String
  },
  products : {
    type : String
  }
})


const LoginSchema = mongoose.model('Users',loginSchema);

module.exports = {LoginSchema}
