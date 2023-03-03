const {LoginSchema,ProductsSchema} = require('../model/model')


const createUserCollection = async(req,res,next)=>{
  try{
      const user = await req.body
      const existingUser = await LoginSchema.findOne({userName:user.userName})
      if(!existingUser && user.IsRegister){
        const createCollection = await LoginSchema.create({
          userName:user.userName,
          password:user.password
        })
        if(createCollection){
          res.status(200).json({
            error : false,
            message : "user registered successfully",
            body :user
          })
        }else{
          res.status(500).json({
            error : true,
            message : "something went wrong",
          })
        }
      }else if(existingUser && user.Islogin){
        const isValid =  existingUser.password  === user.password
        if(isValid){
          res.status(200).json({
            error : false,
            message : "Login sucessful..",
            body :existingUser
          })
        }else{
          res.status(500).json({
            error : true,
            message : "invalid password",
          })
        }
      }else if(existingUser && user.IsRegister){
        res.status(503).json({
          error : true,
          message : "User already exists..",
        })
      }else{
        res.status(503).json({
          error:true,
          message : 'User does not exist'
        })
      }
  }catch(err){
    console.log(err);
  }
}

const postProduct = async(req,res,next)=>{
try{
  const product = await req.body.products;
  const userData = await req.body.user;
  const id = await req.params.id;
  const existingProducts = await ProductsSchema.findOne({_id : id })
  if(existingProducts){
    res.status(503).json({
      error:true,
      message:'products already exists'
    })
  } else {
    const addedProducts = await ProductsSchema.create({
      product: product
    })
    if(addedProducts){
     const updatedUserData = await updateProductsId(userData,addedProducts);
     if(updatedUserData){
      res.status(200).json({
        error: false,
        message : 'Products Added Sucessfully',
        body : addedProducts
      })
     }
    }
  }

}catch(err){
 console.log(err)
}
}


const updateProductsId = async(userData,Products)=>{
  const getUserData = await LoginSchema.findOne({_id:userData.id});
  if(getUserData){
    const updatedUserData = await LoginSchema.updateOne({_id : userData.id},{
      $set : {
        productsId : Products._id
      }
    },)
    if(updatedUserData){
      return true;
    }
  }else{
      res.status(404).json({
        error: true,
        message : 'User not found'
      })
      return false;
  }
}
module.exports = {createUserCollection,postProduct}
