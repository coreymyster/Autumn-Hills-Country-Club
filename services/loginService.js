const db = require('./dbconnection-service');
const getTeeTimesService = require('./getTeeTimesService');


db;     // Call db service to establish database connection

function login(req, res) {
    let email = req.body.email
    let password = req.body.password
    let sql = "SELECT * FROM UserStore WHERE Email = ? AND Password = ?";

    // This query checks that the email address and password entered on the login page exist in the database
        db.query(sql, [email, password], (err, result) => {
            // If the email or password don't exist a message is displayed.
            // If they do exist and match up, then we pass the ID, FirstName and Email from the query
            // to the app so that other services can use them.  
            if(!result[0] || (email == "" && password == "")) {
                res.app.set("userNotAvailable", "The email or password combination does not match our records."); 
                res.redirect('/login'); 
            } else {
                res.app.set("ID", result[0].UserID);
                res.app.set("FirstName", result[0].FirstName);  
                res.app.set("Email", result[0].Email);
                res.app.disable("userNotAvailable")
                getTeeTimesService(req, res, result[0].UserID); // This service will gather the tee times associated with the user in the daatabse
            }
        });
        //return response.send(request.body);
}

module.exports = login;

