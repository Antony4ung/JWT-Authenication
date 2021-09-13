const router = require('express').Router();
const users = require('../data')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')

const { check,validationResult } = require('express-validator')

router.post('/signup',[check('email').isEmail(), check("password").isLength({min : 6}) ],async (req,res)=>{
    const {password , email} = req.body;
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }


    let user = users.find(user => { return user.email === email} )

    if(user){
        return res.status(400).json({
            "errors": [
                {"msg":"user already exist"}
            ]
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword)

    users.push({
        email ,
        password:hashedPassword
    })

    const token = await JWT.sign({email},"ja;sdhfjlalshdfahsldfasdfasdf",{expiresIn : 3600000})

    res.json({
        token
    })
})

router.post('/login', async (req,res)=>{
    const {password , email} = req.body;

    let user = users.find((user) =>{
        return user.email === email;
    })

    if(!user){
        return res.status(400).json({
            "errors": [
                {"msg":"Invalid Credentials"}
            ]
        })
    }

    let isMatch =await bcrypt.compare(password, user.password)
  
    if(!isMatch){
        return res.status(400).json({
            "errors": [
                {"msg":"Invalid Credentials2"}
            ]
        })
    }
    
    const token = await JWT.sign({email},"ja;sdhfjlalshdfahsldfasdfasdf",{expiresIn : 3600000})

    res.json({
        token
    })
})

router.get("/all",(req,res)=>{
    res.json(users)
})

module.exports = router;