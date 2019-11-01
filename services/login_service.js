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
            res.send("User does not exist");
        } else {
            res.send(`
                <div>
                    <h1>Thanks for registering!</h1>
                </div>
            `);
        }
    });
    //return response.send(request.body);
}

module.exports = createAcount;