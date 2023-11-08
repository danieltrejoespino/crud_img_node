const express= require('express')
const app= express()
const PORT=process.env.PORT || 3007;

const routers= require(__dirname+'/routes/routers')
app.use('/',routers)

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");
app.use(express.static(__dirname+"/public"))

// router.use((req, res, next) => {
//   res.status(404).render("404");
// });

app.use((req, res, next) => {
  res.status(404).render('404');
});


module.exports={
    app,
    PORT
  }; 