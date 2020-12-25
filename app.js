const express = require('express');
const PORT = 3131
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path')



//app init
const app = express();

//using body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//connect to database
const mongoose = require('mongoose');
const { DBURL } = require('./dbConfig/db');

mongoose.Promise = global.Promise;
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log("connected to database")
}).catch((err) => {
    console.log(err);
    process.exit();
})

// use ejs-locals for all ejs templates
app.locals.baseURL = `http://localhost:${PORT}`;
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//simple route

app.get('/', (req, res) => {
    return res.render('index');
})

//img routes
require('./app/routes/imgup.routes')(app);

//app.listen

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})