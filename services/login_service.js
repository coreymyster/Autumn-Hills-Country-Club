const db = require('./dbconnection-service');

db;

function createAcount(req, res) {
    let id = req.body.id
    let lname = req.body.last
    let fname = req.body.first
    let address = req.body.address
    let city = req.body.city
    let sql = "INSERT INTO Persons VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [id, lname, fname, address, city], (err, result) => {
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