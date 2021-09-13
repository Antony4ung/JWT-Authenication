const express = require('express')
const auth = require('./routes/auth')
const posts = require('./post')

const  app = express();
app.use(express.json())
app.use('/auth',auth)
app.use('/post',posts)

app.get('/',(req,res)=>{
    res.send('akdfas')
})

app.post('/sign',(res,req)=>{
    res.send("asdkfn;asdn")
})

app.listen(3000,function(){
    console.log('server is running at port 3000')
})