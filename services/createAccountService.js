const db = require('./dbconnection-service');


db;     // Calls db service to establish database connection

// Function for when a user creates an account on the 'create-account' page.
// A request is sent to the corresponding page template and the request results 
// are stored in variables.
function createAcount(req, res) {
    let id = ''
    let fname = req.body.first
    let lname = req.body.last
    let email = req.body.email
    let address = req.body.address
    let city = req.body.city
    let state = req.body.state
    let password = req.body.password
    let sql = "INSERT INTO UserStore VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    
    if (fname == "" || lname == "" || email == "" || address == "" || city =="" || state == "" || password == "") {
        res.app.set("missingInformation", "There is information missing. Please fill out all fields."); 
        res.redirect('/create-account'); 
    } else {
        // Queries the values above and stores them into the UserStore table of the database
        db.query(sql, [id, fname, lname, email, address, city, state, password], (err, result) => {
            
            // Whether the query is a success or if it fails, an HTML response is returned
            if(err) {
                res.app.set("emailExists", "Error: Email address is already registered"); 
                res.redirect('/create-account'); 
            } //else if (fname == "" || lname == "" || email == "" || address == "" || city =="" || state == "" || password == "") {
                //res.app.set("missingInformation", "There is information missing. Please fill out all fields."); 
                //res.redirect('/create-account'); 
            //} 
            else {
                res.send(`
                    <!DOCTYPE html>
                    <head>
                        <link rel="stylesheet" type="text/css" href="./styles/css/app.css">
                    </head>
                    <div class="acccountCreateMessage">
                        <img src="./images/autumn-hills-logo.svg"/>
                        <h1>Thanks for registering!</h1>
                        <p><a href="/login">Log in to your account.</a></p>
                    </div>
                `);
            }
        });
        
        res.app.disable("emailExists")
        res.app.disable("missingInformation")
        //return response.send(request.body);
    }
    }

module.exports = createAcount;