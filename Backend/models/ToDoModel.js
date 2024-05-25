

const mongoose=require('mongoose')
const {Schema}=require('mongoose')
const todoSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
           
        }

    }
)
 
 module.exports= mongoose.model("User", todoSchema)