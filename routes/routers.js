const express=require('express')
const router=express.Router()
const {home,upload_all}= require('../controller/controller')
const multer=require('multer')
router.use(express.json())

//img routes 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./public/uploads/img/'); // Ruta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const sanitizedFileName = file.originalname.replace(/ /g, '_')
    cb(null, sanitizedFileName ); // Nombre del archivo en el servidor
  }
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain', 'audio/mpeg'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(null, false); // Rechazar el archivo
  }
};
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});


router.post('/uploadImage', upload.single('imagen'),upload_all.upload_img)






// rutas principales
router.get('/home',home.home)
router.get('/',home.home)

router.get('/upload_crud',home.upload_page)
router.get('/d-ecrypt',home.ecrypt)

module.exports=router