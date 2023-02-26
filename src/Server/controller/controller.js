const {LoginSchema} = require('../model/model')


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
        res.status(500).json({
          error:true,
          message : 'User does not exist'
        })
      }
  }catch(err){
    console.log(err);
  }
}

module.exports = {createUserCollection}
