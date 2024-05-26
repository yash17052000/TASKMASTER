const Main=require('../models/user.model.js')
const User=require(('../models/ToDoModel'))
const loginUser=require("../controllers/ToDoController.js")
module.exports.lists=async(req,res)=>{
  console.log(loginUser.username);
    const username=req.body;
    console.log(username);
    if(!username)
        console.log("This user doesnt exits in database");

  const data=  await Main.findOne(username).select("-password  -refreshToken").populate("todos").exec()
    
 
res.send(data)
/// jo cheez huma nhi chaa usee mana kr do 
    
    
} 