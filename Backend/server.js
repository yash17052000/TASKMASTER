const DB_NAME = require('./constants');

const express = require('express')
const cors=require('cors')
const routes=require('./Routes/ToDoRoute')
const mongoose=require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT | 5000;;
app.use(cookieParser())

app.use(cors({
    origin:process.env.CORS_ORIGIN,
     credentials:true

}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
;( async ()=>{
try {
    const connectionInstance =   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    app.on("ERROR:",(error)=>{
        console.log("err:",error);
    })
    app.use(routes)
    app.listen(PORT,()=>{
        console.log(`App is listening on port ${PORT}`);
    })
} catch (error) {
    console.log("ERROR:",error);
    throw error
}
})()
