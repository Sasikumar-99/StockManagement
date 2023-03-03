const mongoose = require('mongoose');
const Schema = mongoose.Schema
const loginSchema = new Schema({
  userName : {
    type : String
  },
  password :{
    type : String
  },
  productsId : {
    type : String
  }
})

const productSchema = new Schema({
  productName : {
    type : String
  },
  sellingPrice : {
    type : String
  },
  receivedPrice : {
    type : String
  },
  quantity : {
    type : Number
  }
})

const LoginSchema = mongoose.model('Users',loginSchema);
const ProductsSchema = mongoose.model('Products',productSchema)

module.exports = {LoginSchema,ProductsSchema}
