const express=require('express')
const router=express.Router()
const {home,file_crud }= require('../controller/controller')
const {upload_img,pdfUpload,audioUpload,fileUpload}= require('./multer')
router.use(express.json())



// rutas imagenes
//POST
router.post('/uploadImage', upload_img.single('file'),file_crud.post_file)
router.post('/uploadPDF', pdfUpload.single('file'),file_crud.post_file)
router.post('/uploadAudio', audioUpload.single('file'),file_crud.post_file)
router.post('/uploadFile', fileUpload.single('file'),file_crud.post_file)
//GET
router.get('/allImg',file_crud.getImg)
router.get('/allImg_1',file_crud.getImgJSON)
router.get('/allFiles',file_crud.getFileJSON)

// rutas principales
router.get('/home',home.home)
router.get('/',home.home)
router.get('/upload_crud',home.upload_page)
router.get('/upload_crudv2',home.upload_pagev2)
router.get('/d-ecrypt',home.ecrypt)

module.exports=router

