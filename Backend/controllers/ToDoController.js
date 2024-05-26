const User=require(('../models/ToDoModel'))
const Main=require('../models/user.model.js')
const { asynchandler } = require('../utils/asynchandler.js')
const ApiError = require( "../utils/ApiError");
 const ApiResponse =require( "../utils/ApiResponse");

const generateAccessandRefreshTokens=async (userId)=>{
    try {
      const user=  await Main.findById(userId)
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
    console.log(req.body);


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
    
  // create user object -- create entry in db

// database hmara dusra continent ma hoga and error hona k chcnaces h bhut isma el asynchiandler h to main tain error and
// apply await  keyword befire the method 
  Main.create({
    fullName,
    password,
    username:username.toLowerCase()
})
.then((data) =>{  console.log("registered suceesfully");
console.log(data);
res.send(data)}
)
.catch((err) => console.log(err))


 //chck for user creation 
// better many like this is given here 
// database generate id by default with each entry 
//remove password anf refresh token field from response  using select method



// return response


}
)
const list=[]
module.exports.loginUser=   asynchandler(async(req,res)=>{

    //req body --> data 
    //username or email
    //find the user
    // passoword check
    // acess and refresh token generate 
    //send them in cookies 
    //send the res
    
    const {username,password}= req.body 
    
    
    
    if (!username ) {
        throw new ApiError(400, "username or email is required")
    }
    // this is dcused un video
    // if(!(username||email))// correting this error 
    // throw new ApiError(400,"username or email is required")
    
    const user = await Main.findOne({// findone sa jo bhi database ma entry wo mil jaaegi huma
        $or:[{username}]// check in database it will return according to it
    })
    
    if(!user){
    throw new ApiError(404,"user not exist...")
    }
    //User sa hum mongodb k methods ko acesss kr skta hein
    const isPassowordValid=await user.isPasswordCorrect(password)
    
    if(!isPassowordValid)
    throw new ApiError(401,"Invalid user credentialss")
    const {accessToken,refreshToken}=await generateAccessandRefreshTokens(user._id)
    
    const loggedInUser=await Main.findById(user._id).select("-password  -refreshToken")/// jo cheez huma nhi chaa usee mana kr do 
    
    
    
    // by using below one anyone can modify the cokkies in frontend,but by httponly true and secure : true ya kvl server sa modify hongi
    const options={
        httpOnly:true,
        secure:true
    }
    // console.log(loggedInUser);
    console.log("User loggen in sucessfully");
    
     res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,
                refreshToken
            },
            "user loggend in scuessfully"
        )
    )
    
    
    })
    module.exports.logoutUser=asynchandler(async(req,res)=>{


        // cookies clear
        //reset refeeshtoken
    
      // here we cannot use  "User.findById" as we cant put email while loggout due to this koi bhi frr logout kr dega
      // so here comes concept of middleware8
console.log(req.user._id);
    
    await Main.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
        new :true
        }
    )
    console.log("User loggot out");
    const options={
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out"))
    })
module.exports.getToDo=async(req,res)=>{
    const toDo= await User.find()
    res.send(toDo)
}
module.exports.saveToDo = async(req, res) => {
   
    const { text } = req.body;
    const id=req.user._id.toString()
   
    const userData = await Main.findById(id).select("-password -refreshToken");
    
    
    
        console.log();
   User
        .create({ text ,user_Id:id})
        .then((data) => {
            console.log("added suceesfully");
           userData.todos.push(data)
           userData.save()
           
           console.log(userData.todos);console.log("he is doing work");
            res.send(data)
        }
    )
        .catch((err) => console.log(err));
}
module.exports.updateToDo = async(req, res) => {
    const {text,_id}=req.body
    User.findByIdAndUpdate(_id,{text})

.then((data) =>{ res.set(201).send("Updated Successfully...")
console.log(data);}
)
.catch((err) => console.log(err))
    
    
    res.set(req.body)
}

module.exports.deleteToDo = async(req, res) => {
    console.log("object",req.body._id)
    const id  = req.body._id
    console.log("delete this id plaseae");
    User
        .findByIdAndDelete(id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => console.log(err));
}