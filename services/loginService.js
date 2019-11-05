const db = require('./dbconnection-service');

db;

let d = new Date();
let hours = d.getHours();

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
            if(hours < 12) {
            res.send(`
                <div>
                    <h1>Good morning ${result[0].FirstName} ${result[0].LastName}</h1>
                </div>
            `);
            } else if(hours >= 12 && hours < 5) {
                res.send(`
                    <div>
                        <h1>Good afternoon ${result[0].FirstName} ${result[0].LastName}</h1>
                    </div>
                `);
                } else if(hours >= 5) {
                    res.send(`
                        <div>
                            <h1>Good evening ${result[0].FirstName} ${result[0].LastName}</h1>
                        </div>
                    `);
                    } 
        }
    });
    //return response.send(request.body);
}

module.exports = login;

