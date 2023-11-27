require('dotenv').config()

const express= require('express')
const app= express()
const PORT=process.env.PORT || 3007;
const bodyParser = require('body-parser')

const mongoose = require('mongoose');
const {uri} = require('./db_config/db_mongo')



mongoose.connect(uri)
.then((result) => {
  console.log('conectado');
}).catch((err) => {
  console.log(err);
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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