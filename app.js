const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT
const dbName = process.env.DB_NAME
const uri = `mongodb://localhost/${dbName}`

mongoose.connect(uri,
  {useNewUrlParser: true, useUnifiedTopology: true}
)
.then(() => console.log(`${dbName}`))
.catch(e => console.log(e))

// motor de plantillas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'))

app.use('/', require('./router/web'));
app.use('/games', require('./router/Games'));
app.use('/devs', require('./router/Developers'));

app.listen(port, () => {
  console.log(`En puerto: ${port}`);
})