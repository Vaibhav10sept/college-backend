const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const keys = require('./config/keys');
const collegeRoutes = require('./routes/college-routes');
const studentRoutes = require('./routes/student-routes');


const PORT = process.env.PORT || 8000


const app = express();
// app.use(bodyParser.json({ extended: false }));
app.use(express.json())
app.use(cors({ origin: true, credentials: true }), bodyParser.urlencoded({ extended: true }))
app.enable("trust proxy");


// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI,{ useUnifiedTopology: 
//   true, useNewUrlParser: true } , () => {
//   console.log('connected to mongodb');
// });

mongoose.connect(keys.mongodb.dbURI)
    .then(function(db) { // <- db as first argument
        console.log('connected to mongodb')
    })
    .catch(function(err) {})

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});


app.use('/api/college', collegeRoutes);
app.use('/api/student', studentRoutes);




app.get('/', (req, res) => {
    // const name = req.query.name || 'World';
    // res.setHeader('Content-Type', 'application/json');
    res.send("<H2>Hello, welcome to college finder backend.</h2>");
});

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(process.env.PORT, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});