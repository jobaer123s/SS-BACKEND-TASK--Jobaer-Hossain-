const jwt = require('json-web-token');
const cookies = require('js-cookie');
var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var token = buildSchema(`
  type Query {
    refreshToken: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    refreshToken: () => {
        return 'arefreshToken';
    },
};

// Run the GraphQL query  and  the response

graphql(token, '{ refreshToken }', root).then((response) => {
    console.log(response);
    let accessToken = response.cookies.jwt

    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

    //retrieve the refresh token from the users array
    let refreshToken = users[payload.username].refreshToken

    //verify the refresh token
    try{
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

    let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

    res.cookie("jwt", newToken, {secure: true, httpOnly: true})
    res.send()
});
