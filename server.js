const Routes = require('./Routes') 
const Hapi = require('hapi')
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const db = require('./dbconnection')

//server create 

const server=Hapi.server({
    host:'localhost',
    port:'5500'
})

//server routes
server.route(Routes.userRoutes)
server.route(Routes.bookingRoutes)
// server.route(Routes)
//swagger
let swaggerOptions = {
    info: {
        title: 'Test API Documentation',
        description: 'This is a sample example of API documentation.'
    },
    grouping: 'tags'
   
};

server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]);


//connect database
async function connectDatabase() {
    try {
       
      let database = await db.dbConnection()
        global.DATABASE = database
        await server.start();
        console.log(`the sever is started :${server.info.uri}`)
    } catch (err){
        console.log(err)
    }

}
connectDatabase();


