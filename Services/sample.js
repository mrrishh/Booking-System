async function insertBooking(req, h){
try{
let myData = verifyToken(req.headers.authorization);

req.payload.user_id = objectId(myData._id);

let checkExistingBooking = false;
if(!checkExistingBooking){
let insertBooking = await Services.bookingService.insertNewBooking(req.payload);
return {statusCode: 200, message: "Booking added Successfull", data:req.payload}
}
return Boom.conflict("Booking Already Exists");
}
catch(err){
console.log(err);
return Boom.badRequest("Problem Inserting Data");
}
}

async function verifyToken(token){
try {
let getUserData = await jwt.verify(req.headers.authorization, 'my-secret-key');
return getUserData;
} catch (error) {
Boom.unauthorized("Access Token Invalid");
}
}
