
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
const img_crud={
    home:function (req,res) {
        res.render("img_crud")
    },
}
module.exports={test,img_crud}
