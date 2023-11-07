
const home={ 
  home:function (req,res) {
    res.render("index")
  }, 
  upload_page:function (req,res) {
    res.render("upload_crud")
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
const upload_all={
  upload_img:function(req,res){    
      let name= 'prueba'
      // let name= req.query.name
      console.log(`url: ${req.url} | Method: ${req.method} | Status:${res.statusCode}`);
      if (req.file) {      
        console.log(`imagen ${name} subida con exito`);
        res.json(`imagen ${name} subida con exito`)
      } else {      
        console.log(`Error al subir la imagen ${name}`);
        res.status(400).json(`Error al subir la imagen: ${name}`);
      }
  },
  upload : function (req,res) {
    let name= 'prueba'
    if (req.file) {      
      console.log(`archivo ${name} subido con exito`);
      res.json(`archivo ${name} subido con exito`)
    } else {      
      console.log(`Error al subir el archivo: ${name}`);
      res.status(400).json(`Error al subir el archivo: ${name}`);
    }
  }
}
module.exports={home,upload_all}
