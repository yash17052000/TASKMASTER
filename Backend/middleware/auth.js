const { ApiError } = require("../utils/ApiError.js");
const jwt = require("jsonwebtoken");
const { asynchandler } = require("../utils/asynchandler.js");
const Main=require('../models/user.model.js')

// jb res khaali ho "_ " lga do uski jgh
module.exports.verifyJWT = asynchandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
      //  console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
   
        const user = await Main.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            //neext_video :dsiscussion about frontend
           console.log( "Invalid Access Token")
        }
       // console.log(decodedToken._id);
        req.user = user;
        next()
    } catch (error) {
        console.log( "Invalid Access Token")
    }
    
})