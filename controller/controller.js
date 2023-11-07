
const home={ 
  home:function (req,res) {
    res.render("index",{titulo:"hola mundo"})
  }, 
  img_page:function (req,res) {
    res.render("img_crud")
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
const img_crud={
    home:function (req,res) {
        res.render("img_crud")
    },
    uploadImage:function(req,res){    
      let name= 'prueba'
      // let name= req.query.name
      console.log(`url: ${req.url} | Method: ${req.method} | Status:${res.statusCode}`);
      if (req.file) {      
        console.log(`imagen ${name} subida con exito`);
        res.json(`imagen ${name} subida con exito`)
      } else {      
        console.log(`Error al subir la imagen ${name}`);
        res.status(400).json(`Error al subir la imagen o el formato no es compatible ${name}`);
      }
    }
}
module.exports={home,img_crud}
