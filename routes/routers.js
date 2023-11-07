const express=require('express')
const router=express.Router()
const {home,upload_all}= require('../controller/controller')
const {upload_img,pdfUpload,audioUpload}= require('./multer')
router.use(express.json())


// rutas imagenes
router.post('/uploadImage', upload_img.single('file'),upload_all.upload_img)
router.post('/uploadPDF', pdfUpload.single('file'),upload_all.upload)
router.post('/uploadAudio', audioUpload.single('file'),upload_all.upload)

// rutas principales
router.get('/home',home.home)
router.get('/',home.home)
router.get('/upload_crud',home.upload_page)
router.get('/d-ecrypt',home.ecrypt)

module.exports=router

