const fs = require('fs');

const home={   
  home:function (req,res) {
    const objetoParametros = {
      accion:[
        { id: 0, nombre: 'Upload', ruta:"/upload_crud"},
        { id: 1, nombre: 'Uploadv2', ruta:"/upload_crud_2"},
        { id: 2, nombre: 'Carousel', ruta:"/allImg"},        
        { id: 3, nombre: 'Decodificar', ruta:"/d-ecrypt"}
       ],
      titulo: [ 'CRUD TOOLS'],           
    }
    res.render("index")
  },
  error_404:function (req,res){
    res.render("404")
  },
  upload_page:function (req,res) {
    res.render("upload_crud")
  },
  upload_pagev2:function (req,res) {
    res.render("upload_crudv2")
  },
  ecrypt:function (req,res) {
    const objetoParametros = {
      accion:[
        { id: 1, nombre: 'Codificar' },
        { id: 2, nombre: 'Decodificar' },

      ], 
      tipo: [
        { id: 1, nombre: 'Base 64' },
        { id: 2, nombre: 'prueba' }
      ],
    };

    res.render("d-ecrypt",{parametros:objetoParametros})
  },
}
const file_crud={
  post_file : function (req,res) {
    let name= 'prueba'
    if (req.file) {      
      console.log(`archivo ${name} subido con exito`);
      res.json(`archivo ${name} subido con exito`)
    } else {      
      console.log(`Error al subir el archivo: ${name}`);
      res.status(400).json(`Error al subir el archivo: ${name}`);
    }
  },
  getImg : function (req,res) {    
    const imageDirectory = './public/uploads/img/';
    fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error('Error al leer archivos:', err);
      res.status(500).send('Error al leer archivos');
    } else {
      console.log(files);
      res.render('img_crud', { images: files });
    }    
    });
  },
  getImgJSON : function (req,res) {    
    const imageDirectory = './public/uploads/img/';
    fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error('Error al leer archivos:', err);
      res.status(500).send('Error al leer archivos');
    } else {
      console.log(files);      
      res.json(files)
    }    
    });
  },
  getFileJSON : function (req,res) {    
    const filesDirectory = './public/uploads/files/';
    fs.readdir(filesDirectory, (err, files) => {
    if (err) {
      console.error('Error al leer archivos:', err);
      res.status(500).send('Error al leer archivos');
    } else {
      console.log(files);      
      res.json(files)
    }    
    });
  }
}
module.exports={home,file_crud}
