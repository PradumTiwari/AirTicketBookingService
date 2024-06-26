const express=require('express');
const bodyParser=require('body-parser');
const app=express();
// const PORT=require('./config/serverConfig');
const v1ApiRoutes=require('./routes/index')
const {FLIGHT_SERVICE_PATH}=require('./config/serverConfig')
const db=require('./models/index');



const setupAndStartServer=()=>{
 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
 
    app.get('/api/v1/home',(req,res)=>{
      return res.json({message:"Hitting The Booking Service Home Route"})
    })

    app.use('/api',v1ApiRoutes);
 
   

    app.listen(3002,()=>{
        console.log(`Server Started at PORT ${3002} `);
        if(process.env.DB_SYNC){
          db.sequelize.sync({alter:true});
        }
        console.log(FLIGHT_SERVICE_PATH);
    })

}

setupAndStartServer();