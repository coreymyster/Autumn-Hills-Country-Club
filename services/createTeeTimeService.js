const db = require('./dbconnection-service');
const getTeeTimesService = require('./getTeeTimesService');


db;     // Calls the db service to create a database connection


// Function for when a user creates a tee time on the 'tee-times' page.
// A request is sent to the corresponding page template and the request results 
// are stored in variables.
function createTeeTime(req, res) {
    let TTID = '';
    let UserID = req.app.get("ID"); 
    let date = req.body.date
     let time = req.body.time
     let Email = req.app.get("Email");
     let sql = "INSERT INTO TeeTimes VALUES (?, ?, ?, ?, ?)";
     
     if(date == "" || time == "") {
        res.app.set("missingDateTime", "Both a date and time are required"); 
        res.redirect('/tee-times'); 
     } else {
            // The below query inserts the date and time selected by the user and stores it in the database
        db.query(sql, [TTID, UserID, date, time, Email], (err, result) => {
            if(err) {
            res.send(`An error occured, please try again.`);
            } else {
            getTeeTimesService(req, res, UserID); // This function is run in order to refresh the tee times a user see's on their dashboard
            }
        });
        res.app.disable("missingDateTime")
        //return response.send(request.body);*/
        }
}

module.exports = createTeeTime;

