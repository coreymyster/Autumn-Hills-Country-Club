const db = require('./dbconnection-service');
const getTeeTimesService = require('./getTeeTimesService');


db;

function createTeeTime(req, res) {
    let TTID = '';
    let UserID = req.app.get("ID"); 
    let date = req.body.date
     let time = req.body.time
     let Email = req.app.get("Email");
     let sql = "INSERT INTO TeeTimes VALUES (?, ?, ?, ?, ?)";
     console.log(UserID)
     db.query(sql, [TTID, UserID, date, time, Email], (err, result) => {
         if(err) {
             res.send("An error occured, please try again.");
         } else {
            getTeeTimesService(req, res, UserID);

         }
     });
     //return response.send(request.body);*/
}

module.exports = createTeeTime;

