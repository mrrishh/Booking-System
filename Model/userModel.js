module.exports={
createUserModel:()=>{
    // TODO created custemer schema
db.createCollection("customer",{ 



// const  userSchema =  {
    validator: { $jsonSchema: {
        bsonType: "object",
        required: ["firstName","email","mobile","password" ],
        properties: {
            _id:{
                bsonType:"objectId"
            },
            userName: {
                bsonType: "string",description: "must be a string"
            },
            firstName: {
                bsonType: "string",description: "must be a string"
            },
            lastName: {
                bsonType: "string",description: "must be a string"
            },
            email: {
                bsonType : "string",
               
                description: "must be a string and match the regular expression pattern"
            },
           
            mobile: {
                bsonType: "string",description: "must be a string and is required"
            },
           
            password: {
                bsonType: "string",
            //    exclude: false,
                description: "must be a string"
            },
           

        }
    } },
    validationLevel: "moderate",
    validationAction: "error",
})
}
//console.log(typeof db.createCollection());
}

// module.exports = {
//     createModel:createModel
// }
