const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/dbconnection-service')
const createAccountService = require('./services/createAccountService');
const loginService = require('./services/loginService');
const createTeeTimeService = require('./services/createTeeTimeService');

const port = process.env.PORT || 3000;

// Calls the dbconnection-service.js file to establish database connection
db;

// Runs express and declares it as 'app'
const app = express();



// Middleware
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))



// ** Routes **

// GET methods create routes for their respective templates
// from the 'Views' directory. GET also stores the data from the POST
// methods and passes it to the page templates.

app.get('/', (req, res) => {
    return res.render('home');
});

// Gets data from the '/dashboard' POST method below
// and stores the data it retrieves in the variables in the GET method
app.get('/dashboard', (req, res) => {
    ID = req.app.get("ID");
    FirstName = req.app.get("FirstName");
    Email = req.app.get("Email");
    TeeTime = req.app.get("TeeTime");
    return res.render('dashboard');
});

app.get('/create-account', (req, res) => {
    return res.render('create-account');
});

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/tee-times', (req, res) => {
    missingDateTime = req.app.get("missingDateTime");
    return res.render('tee-times');
});

// Gets data from the '/tee-time-confirmation' POST method below
// and stores the data it retrieves in the variables in the GET method
app.get('/tee-times-confirmation', (req, res) => {
    ID = req.app.get("ID");
    Email = req.app.get("Email");
});

// The POST methods handle the data queries and storage of the app. Since
// each method is doing something specific, we call a service in each of the
// POST methods

app.post('/success', (req, res) => {
   createAccountService(req, res);
});

app.post('/dashboard', (req, res) => {
    loginService(req, res); 
 });

 app.post('/tee-time-confirmation', (req, res) => {
    createTeeTimeService(req, res);
 });

// Used to only listen if the app is running on port 3000 for local development
app.listen(port, () => {
 console.log("Server running on port 3000");
});