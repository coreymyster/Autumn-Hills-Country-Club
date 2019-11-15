const db = require('./dbconnection-service');

db;


function getTeeTimes(req, res, UserID) {
    let sql = "SELECT * FROM TeeTimes WHERE UserID = ?";
    db.query(sql, UserID, (err, result) => {
        res.app.set("TTDate", result[0].Date);
        res.app.set("TTTime", result[0].Time); 
        res.redirect('/dashboard');
        
        //console.log(result);
    })
    //console.log(`Tee Time Service: ${UserID}`);
}

module.exports = getTeeTimes;

