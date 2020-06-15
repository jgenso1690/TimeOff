const express = require('express');
const app = express()
const port = process.env.PORT;
const bodyParser = require('body-parser');
const db = require('./index.js')

const pair = function(string) {
  var arr = string.slice(0,10).split('-')
  var newdate;

    current = arr[0]
    next = arr[1]
    last = arr[2]
  var newdate = [next, last, current].join('/')

  return newdate
}

const day = function(string) {
  var arr = string.slice(0,10).split('-')
  var day;

    current = arr[0]
    next = arr[1]
    last = arr[2]
    day = last;
    return last
}

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/user',function (req,res) {
  var name = req.query.body
  console.log(name)
  var queryStr = `SELECT * FROM users WHERE name = '${name}'`
  db.query(queryStr, (err, data)=> {
    if (err) {
      console.log('no data')
    } else {

      res.send(data[0])
    }
  })


})


app.post('/vacation', (req,res) => {
  var name = req.body.name
  var typeofDay = req.body.typeofDay
  var start = pair(req.body.startDate)
  var end = pair(req.body.endDate)
  var dates = `${start} - ${end}`



  var day1 = day(req.body.startDate)
  var day2 = day(req.body.endDate)

  var used = day2 - day1 + 1
  var queryStr = ''


  console.log(used)
  res.send({'dates': dates, 'used': used})
})

app.listen(port,()=> console.log(`Listening at: http://localhost:${port}...`))
