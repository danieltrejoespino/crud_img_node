
const test={
 
  test:function (req,res) {
    return res.status(200).send('test')
  },
  home:function (req,res) {
    res.render("index",{titulo:"hola mundo"})
  },
  error:function (req,res) {
    res.render("404",{titulo:"hola nahum"})
  }
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
module.exports={test,img_crud}
