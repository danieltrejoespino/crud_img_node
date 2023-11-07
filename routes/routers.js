const express=require('express')
const router=express.Router()
const {home,img_crud}= require('../controller/controller')
const multer=require('multer')
router.use(express.json())

router.get('/home',home.home)
router.get('/error',home.error)
router.get('/',home.home)
router.get('/img_crud',home.img_page)
router.get('/base_64',home.base_64)

//img routes 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./public/uploads/'); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = file.originalname.replace(/ /g, '_')
    cb(null, sanitizedFileName ); // Nombre del archivo en el servidor
  }
});

const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(null, false); // Rechazar el archivo
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});

router.post('/uploadImage', upload.single('imagen'),img_crud.uploadImage)


module.exports=router