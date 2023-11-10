const {app,PORT} = require('./app');


app.listen(PORT,()=>{
  console.log(`Listening on port ${PORT} ...`);
});


// kill port
// fuser -k -n tcp 3007