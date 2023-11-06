const express=require('express')
const router=express.Router()
const {test,img_crud}= require('../controller/controller')

router.use(express.json())

router.get('/test',test.test)
router.get('/error',test.error)
router.get('/',test.home)


router.get('/img_crud',img_crud.home)


module.exports=router