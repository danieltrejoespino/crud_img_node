
const test={
 
  test:function (req,res) {
    return res.status(200).send('test')
  },
  home:function (req,res) {
    res.render("index",{titulo:"hola nahum"})
  },
  error:function (req,res) {
    res.render("404",{titulo:"hola nahum"})
  }
}
module.exports={test}
