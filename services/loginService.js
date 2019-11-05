const db = require('./dbconnection-service');

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
            res.send(`
                <div>
                    <h1>Welcome ${email}!</h1>
                    <p>${result[0].Email}</p>
                </div>
            `);
        }
    });
    //return response.send(request.body);
}

module.exports = login;

