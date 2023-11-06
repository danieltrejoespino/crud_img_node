const express=require('express')
const router=express.Router()
const {test,img_crud}= require('../controller/controller')
const multer=require('multer')
router.use(express.json())

router.get('/home',test.home)
router.get('/error',test.error)
router.get('/',test.home)

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

router.get('/img_crud',img_crud.home)
router.post('/uploadImage', upload.single('imagen'),img_crud.uploadImage)


module.exports=router