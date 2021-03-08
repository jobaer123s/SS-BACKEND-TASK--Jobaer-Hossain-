const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
    database: 'mysql'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// creating a api which will send user rule and access token to authenticate him/her

const getUsersRule = (request, response) => {

    // check and verify JSON web token to authenticate user

    exports.verify = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) res.status(403).json({error: "please provide a token"});
        else {
            jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
                if (err) res.status(500).json({error: 'failed to authenticate token'});
                req.user = value.data;

                // getting user rules and sending response to browser.

                pool.query('SELECT * FROM user_rule WHERE id = $1', [id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log('results.rows',results.rows);

                    const userId = results.rows['userId'];
                    const userType = results.rows['userId'];
                    const userRule = results.rows['userRule'];
                    const generatedUuid = results.rows['generatedUuid'];

                    response.status(200).json({ 'accessToken': generatedUuid,
                        'userId': userId,
                        'userType': userType,
                        'userRule': userRule,})

                })
            })
        }
    };


};
