const db = require('./dbconnection-service');
const getTeeTimesService = require('./getTeeTimesService');


db;

function login(req, res) {
    let email = req.body.email
    let password = req.body.password
    let sql = "SELECT * FROM UserStore WHERE Email = ? AND Password = ?";
    db.query(sql, [email, password], (err, result) => {
        if(!result[0]) {
            res.send(`
                <p>The username or password combination do not match our records. You can try <a href="/login">logging in</a> again.</p>
                <p>Don't have an account? <a href="/create-account">Create an account</a> for free!</p>
                `);
        } else {
            res.app.set("ID", result[0].UserID);
            res.app.set("FirstName", result[0].FirstName);  
            res.app.set("Email", result[0].Email);
            getTeeTimesService(req, res, result[0].UserID);
            //res.redirect('/dashboard');
            /*if(hours < 12) {
            res.send(`
                <div>
                    <h1>Good morning ${result[0].FirstName} ${result[0].LastName}</h1>
                    <div>
                        <p><strong>Upcoming Tee Times</strong></p>
                        <p></p>
                        <p><a href="/tee-times">Book Tee Time</a></p>
                    </div>
                </div>
            `);
            } else if(hours >= 12 && hours < 17) {
                res.send(`
                    <div>
                        <h1>Good afternoon ${result[0].FirstName} ${result[0].LastName}</h1>
                    </div>
                `);
                } else if(hours >= 18) {
                    res.send(`
                        <div>
                            <h1>Good evening ${result[0].FirstName} ${result[0].LastName}</h1>
                        </div>
                    `);
                    } */
        }
    });
    //return response.send(request.body);
}

module.exports = login;

