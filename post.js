const router = require('express').Router()
const {publicPosts,privatePosts} = require('./data')
const checkAuth = require('./middleware/checkAuth')

router.get('/public',(req,res)=>{
    res.send(publicPosts)
})
router.get('/private',checkAuth,(req,res)=>{
    res.send(privatePosts)
})

module.exports = router;