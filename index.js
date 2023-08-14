//this variable "express" is an instance of the framework express
const express = require('express')
//variable "app" is equal to an instance of express. Allows us to make API requests, initialize server
const app = express()
const cors = require('cors'); //import cors from the cors library
//
//Access the body being parced directly
app.use(express.json());
app.use(cors());

//this will make us require all the tables created within the models folder
const db = require('./models');


//Routers
const postRouter = require('./routes/Posts');   //importing router from posts.js  
app.use("/posts", postRouter); //applying route ("route itself", "router variable")

const commentRouter = require('./routes/Comments');
app.use("/comments", commentRouter);

const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter);

//when we start our api, we want to go over the models folder and check if the tables exist
db.sequelize.sync().then(() => {
    //starting API and determine the port that we want to run our server in.
    //This port must be different than the one we initizlize in the react application
    app.listen(3001, () =>  {
        //function runs whenever the server starts. gives us confirmation that server is running
        console.log("Server running on port 3001")
    });
})


