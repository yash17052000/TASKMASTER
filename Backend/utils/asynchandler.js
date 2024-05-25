module.exports.asynchandler=(requesthandler)=>{
    (req,res,next )=>{
    Promise.resolve(requesthandler(req,res,next)).catch((err)=>next(err))
    }
    return requesthandler
    }
    
    