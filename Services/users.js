
var ObjectId = require("mongodb").ObjectID;
const jwt = require('jsonwebtoken')
const Boom = require('boom')
const ResponseSend = require('../Lib/responseSend')
//const ObjectId = require('mongodb').ObjectID
async function emailCheck(req, callback){
    const Model =  db.collection('customer')
    try {
        const emailDataCheck = await  Model.findOne({email:req.payload.email});
        // if(emailDataCheck == null){
        //     return emailDataCheck
        // } else {
        //    console.log("Email Exist") 
        // }
        console.log(emailDataCheck)
        return emailDataCheck

    } catch (error) {
        throw error;
    }
}


async function getUserById(email, callback){
    const Model =  db.collection('customer')
    try {
       
        const userData = await  Model.findOne({email});

        if(userData == null){
            throw "Not Found"
        } else {


            return userData
        }

    } catch (error) {
        throw error;
    }
}

async function createUser(data, callback){
    try {
        const Model =  db.collection('customer')
        
        let data1=
            {  userName:data.payload.userName,
                firstName: data.payload.firstName,      
                lastName:data.payload.lastName,
                email: data.payload.email,
                mobile:data.payload.mobile,
                password:data.payload.password
           }
        const userInsert = await Model.insert(data1)
        const b = {
            _id:userInsert.ops[0]._id,
            userName:userInsert.ops[0].userName,
            firstName:userInsert.ops[0].firstName,
            lastName:userInsert.ops[0].lastName,
            email:userInsert.ops[0].email,
            mobile:userInsert.ops[0].mobile
        }
        return b
      } catch (error) {
          console.log(error);
        throw error;
      }
}



async function loginUser(data, callback){
    const Model =  db.collection('customer')
    try {
        const userData = await  Model.findOne({$and:[{email:data.payload.email,password:data.payload.password}]});
        console.log(userData)
         global.b = {
            _id:userData._id,
            userName:userData.userName,
            firstName:userData.firstName,
            lastName:userData.lastName,
            email:userData.email,
            mobile:userData.mobile
        }
        if(b == null){
            throw "User Not Found"
        } else {

            let token = jwt.sign({_id:b._id} ,'secret');
            b.token=token
           // return ResponseSend.sendSuccess(data.payload,b)
              return b
        }

    } catch (error) {
        throw error;
    }
}

async function updateUser(data){
    try{
    const Model = db.collection('customer');
  
//    data.payload._id=ObjectId(reply._id)
   
   var _id = {_id : data.payload._id};
    var updateData = {
        userName:data.payload.userName,
        firstName: data.payload.firstName,      
        lastName:data.payload.lastName,
        email: data.payload.email,
        mobile:data.payload.mobile,
        password:data.payload.password
    };
    const updatedData= Model.replaceOne(_id,updateData);
    return updatedData;
   // return Boom.sucess('data updated successfullyyyy');
    }catch(err){
      //  return Boom.notFound('error while updating the customer detail');
      console.log(err)
        throw err;
    }   
}
 async function verifyToken(token,key) {
    
    try {
         console.log(token)   
    const decoded = await jwt.verify(token,key);
    return decoded;

    } catch (e) {
    //  decoded = false; // still false
   console.log(e)

   return Boom.unauthorized("Sorry not authorized");


    }
   
  }






module.exports = {
    emailCheck: emailCheck,
    createUser: createUser,
    getUserById:getUserById,
    loginUser:loginUser,
    updateUser:updateUser,
    verifyToken:verifyToken
   
}