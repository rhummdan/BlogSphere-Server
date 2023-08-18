const express = require("express");
const router = express.Router();
const {Users} = require("../models");
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const {validateToken} = require('../middlewares/AuthMiddleware')


//this route will create a user in the users table
router.post("/", async (req, res) => {
    const {username, password} = req.body; //the reason we destructor the object is that we want to hash the pass into the db
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("success");
    }); //this will scramble the password, so that it keeps it more secure
});

//this route will check to see if the user logged in correctly
router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    //checking to see if username exists. If it doesn't, variable will remain empty
    const user = await Users.findOne({where: {username: username}});

    //if user doesn't exist, return and send message
    if(!user) {
        return res.json({error: "User does not exist"});
    }
    bcrypt.compare(password, user.password).then((match) => {
        if(!match) { //comparing the password that user inputted with the hashed one in the db
            return res.json({error: "Wrong Username and Password Combination"});
        }
        //creating access token, which will later be stored in sessionStorage
        const accessToken = sign({username: user.username, id: user.id}, "importantsecret"); //creating token and the data inside is just the username and id of user loggef in
        res.json({token: accessToken, username: username, id: user.id});
    }); 
});

// //making sure there aren't two users with the same username
// router.post("/repeat", async(req, res) => {
//     const {username, password} = req.body;
//     const user = await Users.findOne({where: {username: username}});

//     if(user) {
//         return
//     } else {
//         return res.json({error: "User Already Exists."})
//     }
// })

//this route is just to check if we're authenticated or not
router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
})


router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id;

    const basicInfo = await Users.findByPk(id, {    //query from users table the users info based on id. Exclude the password
        attributes: {exclude: ['password']}, 
    }); 
    res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
    //destructor req.body. both passwords have to be passed exactly like the keys below or else it won't work
    const {oldPassword, newPassword} = req.body;
    const user = await Users.findOne({where: {username: req.user.username}});

    bcrypt.compare(oldPassword, user.password).then( async (match) => {
        if(!match) { //comparing the password that user inputted with the hashed one in the db
            return res.json({error: "Wrong Password"});
        }
        bcrypt.hash(newPassword, 10).then((hash) => {
            Users.update({password: hash}, {where: {username: req.user.username}})
            res.json("success");
        }); 
    }); 
})

module.exports = router;