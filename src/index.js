const express=require('express');
const bodyParser=require('body-parser');
const app=express();
// const PORT=require('./config/serverConfig');
const v1ApiRoutes=require('./routes/index')

const db=require('./models/index');



const setupAndStartServer=()=>{
 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
 
    app.use('/api',v1ApiRoutes);
 
    

    app.listen(3002,()=>{
        console.log(`Server Started at PORT ${3002} `);


        if(process.env.DB_SYNC){
          db.sequelize.sync({alter:true});
        }
    })

}

setupAndStartServer();