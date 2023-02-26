const express = require('express')();
const mongoose = require('mongoose');
const {createUserCollection} = require('./controller/controller')
const bodyParser = require('body-parser')
const cors = require('cors');
express.use(cors({
    origin: '*'
}));
// parse application/x-www-form-urlencoded
express.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
express.use(bodyParser.json())

require('dotenv').config();
mongoose.set('strictQuery',true);
dbConnect();

async function dbConnect(){
  try{
    const url = process.env.MONGO_DB_URL ? process.env.MONGO_DB_URL : 'mongodb+srv://sasi358459:Sasi358459@cluster0.h2vvopf.mongodb.net/?'
    const dbConnect = await mongoose.connect(url,{})
    if(dbConnect){
      console.log('mongo connected');
      setRoutes();
      hostServer();
    }
  }catch(err){
    console.log(err);
  }
}

function setRoutes(){
  express.get('/',(req,res)=>{
    res.send('hello')
  })
  express.get('getAllUser',)
  express.post('/login',createUserCollection)
}

async function hostServer(){
  const port = process.env.PORT ? process.env.PORT : 3000
  const server = await express.listen(port)
  if(server){
    console.log(`server started at ${port}`);
  }
}
