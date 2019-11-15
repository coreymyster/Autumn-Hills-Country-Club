const db = require('./dbconnection-service');

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
             res.send("User does not exist");
         } else {
             res.send(`
                 <div>
                     <h1>Thanks for registering!</h1>
                 </div>
             `);
         }
     });
}

module.exports = createTeeTime;

