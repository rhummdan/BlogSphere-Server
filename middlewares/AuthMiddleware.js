//we want to grab token sent from frontend and then validate it by using JWT function, before posting 
const {verify} = require('jsonwebtoken'); //This will help us verify whether or not user created fake web token

const validateToken = (req, res, next) => {
    //will recieve accessToken from headers to verify it
    const accessToken = req.header("accessToken");     //We're going to pass the token through the header of the request
    //checking if an accessToken was even passed by checking if variable is null
    if(!accessToken) {
        return res.json({error: "User not logged in."});
    } 

    //comparing the secret to make sure access token is valid and not a fake one
    try {
        //valid token is an object containgin user info
        const validToken = verify(accessToken, "importantsecret"); 
        req.user = validToken; //creating object variable in the req object which contains user info
        if(validToken) {
            return next();
        }
    } catch (err) {
        return res.json({error: err});
    }
}

module.exports = {validateToken};