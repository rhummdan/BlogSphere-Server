const express = require('express')
const router = express.Router()
const {Posts, Likes} = require("../models"); //instance of the post model that we created in the model folder
const { validateToken } = require('../middlewares/AuthMiddleware');



router.get("/", validateToken, async (req, res) => {
    //joining the likes and posts table
    const listOfPosts = await Posts.findAll({include: [Likes]}); // go through the table and generate sql to select every element

    //getiing aray of all the posts that the user whos logged in has liked
    const likedPosts = await Likes.findAll({where: {UserId: req.user.id}})
    res.json({listOfPosts: listOfPosts, likedPosts: likedPosts});
});

//creating get route to get a specefic post's info. That is why we have an id param in the route. 
router.get("/info/:id", async (req, res) => {
    const id = req.params.id; //storing the id param in a variable
    const post = await Posts.findByPk(id); //This will return the row of correct post into the "post variable". "Posts" refers to the model we created
    res.json(post);
})

router.post("/", validateToken, async (req, res) => {
    const post = req.body; //grabbing post data from the body that is sent in the request
    post.username = req.user.username; //adding username value to the object "post". The username was given to us after calling "validateToken"
    post.UserId = req.user.id;
    await Posts.create(post); 
    res.json(post); 
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;
    await Posts.destroy({where: {
        id: postId,
    }})
    
    
    res.json("deleted successfully") // *before adding this line, error occured*
})

router.get("/byuserId/:id", async (req, res) => {
    const userId = req.params.id;
    const listOfPosts = await Posts.findAll({where: {UserId: userId}, include: [Likes],});
    res.json(listOfPosts);
});

//allow user to edt post title
router.put("/title", validateToken, async (req, res) => {
    const {newTitle, id} = req.body;
    await Posts.update({title: newTitle}, {where: {id: id}});
    res.json(newTitle);
})

//allow user to edit post text
router.put("/postText", validateToken, async (req, res) => {
    const {newText, id} = req.body;
    await Posts.update({postText: newText}, {where: {id: id}});
    res.json(newText); 
})


//were gonna have to access the router in index.js and that's why we export it here
module.exports = router;