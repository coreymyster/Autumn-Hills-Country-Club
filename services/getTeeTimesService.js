const db = require('./dbconnection-service');

db;     // Calls db service to establish a connection with the database


function getTeeTimes(req, res, UserID) {
    let sql = "SELECT * FROM TeeTimes WHERE UserID = ?";
    db.query(sql, UserID, (err, result) => {
        
        if (result) {
            res.app.set("TeeTime", result); 
            res.redirect('/dashboard');
        } else {
            res.redirect('/dashboard');
        }
        
        //console.log(result);
    })
    //console.log(`Tee Time Service: ${UserID}`);
}

module.exports = getTeeTimes;

