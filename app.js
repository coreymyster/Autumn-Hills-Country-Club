const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/dbconnection-service')
const createAccountService = require('./services/createAccountService');
const loginService = require('./services/loginService');
const getTeeTimesService = require('./services/getTeeTimesService');
const createTeeTimeService = require('./services/createTeeTimeService');

const port = process.env.PORT || 3000;


db;


const app = express();



// Middleware

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))


app.get('/', (req, res) => {
    return res.render('home');
});

app.get('/dashboard', (req, res) => {
    ID = req.app.get("ID");
    FirstName = req.app.get("FirstName");
    Email = req.app.get("Email");
    TeeTime = req.app.get("TeeTime");

    /*let hourOfDay = "time";

    if(TTTime >= 12) {
        hourOfDay = "PM";
    } else {
        hourOfDay = "AM";
    }*/

    return res.render('dashboard');
});

app.get('/form-with-get', (req, res) => {
    return res.render('form-with-get');
});

app.get('/form-with-post', (req, res) => {
    return res.render('form-with-post');
});

app.get('/create-account', (req, res) => {
    return res.render('create-account');
});

app.get('/login', (req, res) => {
    return res.render('login');
});

app.get('/tee-times', (req, res) => {
    return res.render('tee-times');
});

app.get('/tee-times-confirmation', (req, res) => {
    ID = req.app.get("ID");
    Email = req.app.get("Email");
});

app.get('/submit-form-with-get', (req, res) => {
    return res.send(req.query);
});

app.post('/submit-form-with-post', (req, res) => {
    let fname = req.body.first
    let sql = "SELECT * FROM Persons WHERE FirstName = ?";
    db.query(sql, fname, (err, result) => {
        if(err) {
            res.send("User does not exist");
        } else {
            res.send(`
                <div>
                    <h1>${result[0].FirstName} ${result[0].LastName}</h1>
                </div>
            `);
        }
    });
    //return response.send(request.body);
});





// Create User Service 

app.post('/success', (req, res) => {
   createAccountService(req, res); //Delete only this line incase I need to revert
    /*let id = req.body.id
    let lname = req.body.last
    let fname = req.body.first
    let address = req.body.address
    let city = req.body.city
    let sql = "INSERT INTO Persons VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [id, lname, fname, address, city], (err, result) => {
        if(err) {
            res.send("User does not exist");
        } else {
            res.send(`
                <div>
                    <h1>Thanks for registering!</h1>
                </div>
            `);
        }
    });
    //return response.send(request.body);*/
});

app.post('/dashboard', (req, res) => {
    loginService(req, res); //Delete only this line incase I need to revert
    
    //ID = req.app.get("ID");
    //console.log();
    
    //console.log(req.app.get("ID"));
    //getTeeTimesService(req, res);
    /*let id = req.body.id
     let lname = req.body.last
     let fname = req.body.first
     let address = req.body.address
     let city = req.body.city
     let sql = "INSERT INTO Persons VALUES (?, ?, ?, ?, ?)";
     db.query(sql, [id, lname, fname, address, city], (err, result) => {
         if(err) {
             res.send("User does not exist");
         } else {
             res.send(`
                 <div>
                     <h1>Thanks for registering!</h1>
                 </div>
             `);
         }
     });
     //return response.send(request.body);*/
 });

 app.post('/tee-time-confirmation', (req, res) => {
    createTeeTimeService(req, res);
 });

app.listen(port, () => {
 console.log("Server running on port 3000");
});