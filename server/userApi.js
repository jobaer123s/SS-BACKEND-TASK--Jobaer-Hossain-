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


// creating a api which will check user authorization with rule

router.get('/userLoginWithToken', function(request, response, next) {

    // getting user id and password from request

    const userId = res.userId;
    const password = res.password;

    pool.query('SELECT id,email, password, user_type FROM user WHERE email = res.userId', [id], (error, results) => {
        if (error) {
            response.status(400).send("Oops! Please try again with the correct mobile/email.")
        }
        console.log('results.rows',results.rows);
        const userId = results.rows['userId'];
        const userType = results.rows['userType'];

        const jwt = require("jsonwebtoken");

        userLoginWithToken()

        response.status(200).json({ 'accessToken': jwt,
            'userId': userId,
            'userType': userType})

    })

});


// creating a api which will send user rule and access token to authenticate him/her

const userLoginWithToken = (request, response) => {

    // check and verify JSON web token to authenticate user

    const userId = response.userId;

    exports.verify = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) res.status(403).json({error: "please provide a token"});
        else {
            jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
                if (err) res.status(500).json({error: 'failed to authenticate token'});
                req.user = value.data;

                // getting user rules and sending response to browser.

                pool.query('SELECT * FROM user_rule_privilege WHERE id = userId', [id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log('results.rows',results.rows);

                    const userRule = results.rows['userRule'];
                    const generatedUuid = results.rows['generatedUuid'];

                    userRule.forEach((aclRoleComponent)=> {
                        aclRoleComponent.rolesWithFunctions.forEach((abc)=> {
                            if(abc['function_name']=== v){
                                flag=true;
                            }
                        })
                    })

                    response.status(200).json({ 'accessToken': generatedUuid,
                        'userRule': userRule,})
                })
            })
        }
    };
};


// creating a api which will save blog post

router.post('/saveBlogPost', function(request, response, next) {

    // getting blog post information

    const { title, post_body, user_id } = request.body;

    // Checking user authentication

    pool.query('SELECT id FROM user WHERE id = id', [id], (error, results) => {
        if (user_id !== results.id) {
            response.status(400).send("Oops! You are not authenticate user")
        }
    });

    pool.query('INSERT INTO blog_post (title, post_body, user_id) VALUES ($1, $2, $3)', [title, post_body, user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Blog post saved`)
    })

});

// creating a api which will update blog post

router.put('/updateBlogPost', function(request, response, next) {

    // getting blog post information

    const { title, post_body, user_id, id } = request.body

    // Checking blog post editor authorization

    pool.query('SELECT user_id FROM blog_post WHERE id = id', [id], (error, results) => {
        if (user_id !== results.user_id) {
            response.status(400).send("Oops! You are not authorized to update a blog post")
        }
    });

    pool.query('UPDATE blog_post SET title = $1, post_body = $2 WHERE id = $3',
        [ title, post_body, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Blog modified with`)
        }
    )

});

// creating a api which will delete blog post

router.delete('/deleteBlogPost', function(request, response, next) {

    // getting blog post information

    const { title, post_body, user_id, id } = request.body

    // Checking blog post editor authorization

    pool.query('SELECT user_id FROM blog_post WHERE id = id', [id], (error, results) => {
        if (user_id !== results.user_id) {
            response.status(400).send("Oops! You are not authorized to delete a blog post")
        }
    });

    pool.query('DELETE FROM blog_post WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Blog deleted successfully`)
    })
});

//  Blog Comment
// creating a api which will save blog post comment

router.post('/saveBlogPostComment', function(request, response, next) {

    // getting blog post information

    const { title, post_body, user_id } = request.body;

    // Checking user authentication

    pool.query('SELECT id FROM user WHERE id = id', [id], (error, results) => {
        if (user_id !== results.id) {
            response.status(400).send("Oops! You are not authenticate user")
        }
    });

    pool.query('INSERT INTO blog_post (title, post_body, user_id) VALUES ($1, $2, $3)', [title, post_body, user_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Blog post comment saved`)
    })

});
