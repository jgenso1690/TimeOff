const express = require('express');
const app = express()
const port = 4000;
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/',function (req,res) {
  res.send('hello world')

})

app.post('/vacation', (req,res) => {
  console.log(req)
  res.end()
})

app.listen(port,()=> console.log(`Listening at: http://localhost:${port}...`))
