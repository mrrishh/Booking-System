const Controller = require('../Controller')
const JoiValidator = require('../Lib/joiValidator')
const Joi = require('joi')

module.exports=[
    {
 
        path:'/api/user/createbooking',
        method:'POST',
        config:{
           tags:['api','booking'],
          plugins:{
              'hapi-swagger':{
            payloadType:'Form'
              }
          }, 
        
        validate:{
            payload:{
                seat: Joi.number().required(),
                address: Joi.object().keys({
                   location: Joi.string().required(),
                   zipcode: Joi.string().required()
               })
            },
            headers: Joi.object({
                'authorization':Joi.string().required()
            }).unknown()
        }
    },
        async handler(req, res) {
            try{
                console.log("hiii")
                const response = await Controller.BookingController.userBooking(req)
               
                return response
            }
            catch(error)
            {
                console.log(error);
                throw error
            }
            
        }

},
{
    path:'/api/user/getall/booking',
        method:'POST',
        config:{
          //  auth: 'jwt',
            tags:['api','booking']  ,     
        
        validate:{
            headers: Joi.object({
                'authorization':Joi.string().required()
            }).unknown()
        }
    },
        async handler(req, res) {
            try{
                console.log("getallBooking")
                const response = await Controller.BookingController.getBooking(req)
               
                return response
            }
            catch(error)
            {
                console.log(error);
                throw error
            }
            
        }
}

]