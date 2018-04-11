module.exports={
    createBookingModel:()=>{
db.createCollection("newbooking",{
    validator:{
        $jsonSchema:{
            bsonType:['object'],
            //additionalProperties:false,
            required:["user_id","seat","address"],
            properties:{
            
                user_id:{
                    bsonType:"objectId"
                },
                 seat:{
                     bsonType:"int",
                     minimum:0,
                     maximum:1000,
                     exclusiveMaximum:false,
                     description:"must be integer in [0,1000] and is equired"
                 },
                 address:{
                     bsonType: ["object"],
                     minItems:1,
                     maxItems:20,
                     items:{
                         //bsonType:["object"],
                         required:["location","zipcode"],
                         //additionalProperties:false,
                         properties:{
                             location:{
                                 bsonType:["string"],
                                 description:"must be in string"
                             },
                             zipcode:{
                                 bsonType:["string"],
                                 description:"must be required and of doble or decimal type"
                             }
                         }
                     }
                 }
                 
                  
            }
        }
    }
});

}
}