const Controller = require('../Controller')
const JoiValidator = require('../Lib/joiValidator')
const Joi = require('joi')
module.exports=[

    /*
    Get user details with Id
     */
{
   
        path:'/api/user/findbyemail',
        method:'POST',
        config:{
          
            tags:['api','user'],
            plugins:{
                'hapi-swagger':{
              payloadType:'Form'
                }
            }, 
            validate: {
                payload: JoiValidator.userGetByEmail(),
               }
            },
        async handler(req, res) {
            const response = await Controller.UserController.userDetail(req)
            return response
        }
  

},

    /*
     Sign up function for user
     */

{
        path:'/api/user/create',
        method:'POST',
       config:{
       // auth: false,
        tags:['api','user'],   
        plugins:{
            'hapi-swagger':{
          payloadType:'Form'
            }
        }, 
        validate: {
            payload: JoiValidator.signUp()
        },
    },
        async handler(req, res) {
         //   req.body.ip =req.headers.host;
            const response = await Controller.UserController.userSignup(req)
            //console.log(response);
            return response
        }
     },
    /*
     Login function for user
     */


   {
        path:'/api/user/login',
        method:'POST', 
        config:{
           // auth: false,
            tags:['api','user'],
            plugins:{
                'hapi-swagger':{
              payloadType:'Form'
                }
            }, 
            validate: {
                payload: JoiValidator.login()
            },
         async handler(req, res) {
           //req.body.ip =req.headers.host;
           const response = await Controller.UserController.userLogin(req)
           return response
       }
     }
    },

    /* Update Function for user*/
    {
        path: '/api/user/login/update',
        method:'POST',
        config:{
            // auth: false,
             tags:['api','user'],
             plugins:{
                 'hapi-swagger':{
               payloadType:'Form'
                 }
             }, 
             validate: {
                payload: JoiValidator.update(),
                 headers: Joi.object({
                'authorization':Joi.string().required()
            }).unknown()
              },
          async handler(req, res) {
            //req.body.ip =req.headers.host;
            const response = await Controller.UserController.userUpdate(req)
            return response
        }
      }

    }

    ]



   


