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

const productsArray = new Schema({
  products : [
    productSchema
  ]
})
const LoginSchema = mongoose.model('Users',loginSchema);
const ProductsSchema = mongoose.model('Products',productsArray)
const ProductItemSchema = mongoose.model('ProducyItemSchema',productSchema )

module.exports = {LoginSchema,ProductsSchema,ProductItemSchema}
