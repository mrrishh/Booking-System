
const ObjectId = require('mongodb').ObjectId
const Services = require('../Services')
const ResponseSend = require('../Lib/responseSend')
const Boom = require('boom')

async function userBooking(req) {
    try{
        
        let token = await Services.UserService.verifyToken(req.headers.authorization,'secret')
       console.log("Token ID: "+ token._id)
       if(token._id==undefined)
       {
        
       return Boom.unauthorized("Wrong Token");
       }
       else{
        req.payload.user_id=ObjectId(token._id)
      
        let userData = await Services.BookingService.createBooking(req)
        return ResponseSend.sendSuccess(req.payload,userData)
       }
       
      
        
    }
    catch(error){
        console.log(error)
        return ResponseSend.sendTokenError(error);

    }
}

async function getBooking(req){
    try {
        let token = await Services.UserService.verifyToken(req.headers.authorization,'secret')
       // req.payload.user_id=ObjectId(token)
       console.log("ASD"+token)
       if(token._id==undefined)
       {
        
       return Boom.unauthorized("Wrong Token");
       }
       else{
        let getData = await Services.BookingService.getAllBooking(token._id)
        return ResponseSend.sendSuccess(req.payload,getData)
       }
    }
    catch(error)
    {
        console.log(error)
        throw error;
    }
}

module.exports={
    userBooking:userBooking,
    getBooking:getBooking
}