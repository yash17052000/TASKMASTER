const ToDoModel=require('../models/ToDoModel')
const User=require('../models/user.model.js')
const { asynchandler } = require('../utils/asynchandler.js')
const ApiError = require( "../utils/ApiError.js");
 const ApiResponse =require( "../utils/ApiResponse.js");

module.exports.generateAccessandRefreshTokens=async (userId)=>{
    try {
      const user=  await User.findById(userId)
     const accessToken= user.generateAccessToken()
    const refreshToken=  user.generateRefreshToken()
      user.refreshToken=refreshToken// it has store refreshtoken in datatbase
      await user.save({validateBeforeSave:false})
      return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"something wnet wrong while generating refresh and acess tojen")
    }
}
module.exports.registerUser=asynchandler(async (req,res)=>{
    console.log();


    /// get user details from frontend
const {fullName,username,password}=req.body
    //console.log("request of body is ....",req.body);
     if(!fullName)
         throw new ApiError(400,"fullname is misiing")
     if(!username)
        throw new ApiError(400,"username is missing")
    if(!password)
        throw new ApiError(400,"passowrd is missing")
    // check if usetr exists :username,email

    // if we want more value then we jhave to use "$or" 
const existedUser =await User.findById(
  username
 )
if (!existedUser) {
    throw new ApiError(409,"User with email or userName already exists  ")
 }
  // create user object -- create entry in db

// database hmara dusra continent ma hoga and error hona k chcnaces h bhut isma el asynchiandler h to main tain error and
// apply await  keyword befire the method 
const user=await  User.create({
    fullName,
    password,
    username:username.toLowerCase()
})
 //chck for user creation 
if(!user)
    console.log("error is there");
// we have many methods to do this so better many like this is given here 
// database generate id by default with each entry 
//remove password anf refresh token field from response  using select method
const CreatedUser=await  User.findById(user._id).select(
    "-password -refreshToken"

)

if(!CreatedUser)
{
    throw new ApiError(500,"something went wrong while regitering the user")
}
// return response
return res.status(201).json(
    new   ApiResponse(  200,CreatedUser,"user regsitered sucessfully")
)

}
)
// const loginUser=   asynchandler(async(req,res)=>{

// //req body --> data 
// //username or email
// //find the user
// // passoword check
// // acess and refresh token generate 
// //send them in cookies 
// //send the res

// const {email,username,password}= req.body 



// if (!username && !email) {
//     throw new ApiError(400, "username or email is required")
// }
// // this is dcused un video
// // if(!(username||email))// correting this error 
// // throw new ApiError(400,"username or email is required")

// const user = await User.findOne({// findone sa jo bhi database ma entry wo mil jaaegi huma
//     $or:[{username},{email}]// check in database it will return according to it
// })

// if(!user){
// throw new ApiError(404,"user not exist...")
// }
// //User sa hum mongodb k methods ko acesss kr skta hein
// const isPassowordValid=await user.isPasswordCorrect(password)

// if(!isPassowordValid)
// throw new ApiError(401,"Invalid user credentialss")
// const {accessToken,refreshToken}=await generateAccessandRefreshTokens(user._id)

// const loggedInUser=await User.findById(user._id).select("-password  -refreshToken")/// jo cheez huma nhi chaa usee mana kr do 



// // by using below one anyone can modify the cokkies in frontend,but by httponly true and secure : true ya kvl server sa modify hongi
// const options={
//     httpOnly:true,
//     secure:true
// }
// // console.log(loggedInUser);
// console.log("User loggen in sucessfully");

// return res.status(200)
// .cookie("accessToken",accessToken,options)
// .cookie("refreshToken",refreshToken,options)
// .json(
//     new ApiResponse(
//         200,
//         {
//             user:loggedInUser,accessToken,
//             refreshToken
//         },
//         "user loggend in scuessfully"
//     )
// )


// })
module.exports.getToDo=async(req,res)=>{
    const toDo= await ToDoModel.find()
    res.send(toDo)
}
module.exports.saveToDo = async(req, res) => {
    const { text } = req.body;

    ToDoModel
        .create({ text })
        .then((data) => {
            console.log("added suceesfully");
            console.log(data);
            res.send(data)
        }
    )
        .catch((err) => console.log(err));
}
module.exports.updateToDo = async(req, res) => {
    const {text,_id}=req.body
ToDoModel.findByIdAndUpdate(_id,{text})

.then((data) =>{ res.set(201).send("Updated Successfully...")
console.log(data);}
)
.catch((err) => console.log(err))
    
    
    res.set(req.body)
}

module.exports.deleteToDo = async(req, res) => {
    console.log("object",req.body.data.id)
    const id  = req.body.data.id;
    ToDoModel
        .findByIdAndDelete(id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => console.log(err));
}