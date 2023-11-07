const multer=require('multer')

//img routes 
const storage_img = multer.diskStorage({
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
const upload_img = multer({ 
  storage: storage_img,
  fileFilter: fileFilter 
});

//upload pdf
const pdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/pdf/'); // Carpeta de destino para PDFs
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const pdfUpload = multer({ storage: pdfStorage });

//upload audio
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/audio/'); // Carpeta de destino para PDFs
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const audioUpload = multer({ storage: audioStorage });

module.exports = {
  upload_img,
  pdfUpload,
  audioUpload
};

