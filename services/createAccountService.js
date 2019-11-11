const db = require('./dbconnection-service');

db;

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
    db.query(sql, [id, fname, lname, email, address, city, state, password], (err, result) => {
        if(err) {
            res.send(`
            <!DOCTYPE html>
            <head>
                <link rel="stylesheet" type="text/css" href="./styles/css/app.css">
            </head>
            <div class="acccountCreateMessage">
                <img src="./images/autumn-hills-logo.svg"/>
                <p><a href="/create-account">An error occcured. Please try again.</a></p>
            </div>
        `);
        } else {
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
    //return response.send(request.body);
}

module.exports = createAcount;