const express=require('express')
const router=express.Router()
const {test}= require('../controller/controller')

router.use(express.json())

router.get('/test',test.test)
router.get('/error',test.error)
router.get('/',test.home)


module.exports=router