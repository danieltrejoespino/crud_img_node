const { Usuario } = require('../model/modelMongo')

const crud_mongo={
  test : function (req,res) {
    async  function pruebas() {
      try {
        const arrayUsuariosDB= await Usuario.find()
        console.log(arrayUsuariosDB);
        return arrayUsuariosDB;
      } catch (error) {
        
      }
    }
    res.json(pruebas())
  },
  insert : function (req,res) {
    const body = req.body
    console.log(body)
    
    res.json(body)
  }
}


module.exports={  
  crud_mongo
}
