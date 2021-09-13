const JWT = require('jsonwebtoken')

module.exports = async (req,res,next)=>{

    const token = req.header("x-auth-token")
    if(!token){
        return res.status(400).json({
                    "errors": [
                        {"msg":"No Token Found"}
                    ]
                })
    }


    try{
        let user = await JWT.verify(token ,"ja;sdhfjlalshdfahsldfasdfasdf" )
        req.user = user.email;
        next();
    }catch(error){
        return res.status(400).json({
            "errors": [
                {"msg":"Token Invalid"}
            ]
        })
    }

}