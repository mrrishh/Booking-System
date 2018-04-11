
const Boom = require('boom')
const ObjectId=require('mongodb').ObjectId
async function createBooking(req){
    const bookingModel = db.collection('newbooking');
    try{
        console.log(req.payload);
        let insertBooking = await bookingModel.insert(req.payload);
        return insertBooking;
    }
    catch(error){
        console.log("error")
        throw error
    }
}
async function getAllBooking(id)
{
    const bookingModel = db.collection('newbooking');
   
    try{
        console.log("Im in getallbooking")
        let getBooking = await bookingModel.aggregate([
            {
              $lookup:
                {
                  from: "customer",
                  localField: "user_id",
                  foreignField: "_id",
                  as: "booking"
                }
            
            },
                {
                    $match: {
                        user_id:ObjectId(id)
                    }
                }
            
           
        ]).toArray();
        if(getBooking)
       {
        for(let i=0; i<getBooking.length;i++)
        {
            delete getBooking[i].address
           
        }
    }
           // var cursor = db.bookingModel.aggregate(getBooking);
            // var chunkIds = getBooking.map(function (getBooking....................) { return bookingModel._id; });
            // bookingModel.removeOne({"address": { "$in": chunkIds }});
       console.log(getBooking)
        return getBooking;
    }
    catch(error)
    {
        console.log(error)
        throw error;
    }
}



module.exports={
    createBooking:createBooking,
    getAllBooking:getAllBooking
}
