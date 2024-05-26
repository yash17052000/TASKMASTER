

const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const todoSchema = new Schema({
    
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Main",
       required:true
    },
    text: {
        type: String,
        required: true,
        unique: true
    }
});




 
 module.exports= mongoose.model("User", todoSchema)