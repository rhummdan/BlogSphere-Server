//we want to grab token sent from frontend and then validate it by using JWT function, before posting 
const {verify} = require('jsonwebtoken'); //This will help us verify whether or not user created fake web token

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");     //Access token is passed through the request header
    if(!accessToken) { //Checking if accessToken was passed
        return res.json({error: "User not logged in."});
    } 

    //comparing the secret to make sure access token is valid and not a fake one
    try {
        //valid token is an object containing user info
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