const user=process.env.user
const pass=process.env.pass
const dbname=process.env.dbname
// const uri=`mongodb+srv://${user}:${pass}@cluster0.hn9zd6c.mongodb.net/`
const uri = `mongodb+srv://${user}:${pass}@cluster0.hn9zd6c.mongodb.net/${dbname}?retryWrites=true&w=majority`

module.exports = {uri}