//importing express library, which contains router 
const express = require('express')
const router = express.Router()
const {Comments} = require("../models"); //instance of the post model that we created in the model folder
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    //go to comments table and return every row in which the PostId is equal to the postId passed into the parameter
    const comments = await Comments.findAll({where: {PostId: postId}});
    res.json(comments);
});

//using the authMiddleware that we created before posting a comment. This will ensure that user is authenticated before being able to post one
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;  //giving the comment a username property and setting it
    await Comments.create(comment);
    res.json(comment); //comment object will be sent as a json when api is called
});

//route to delete comment
//we're calling the middleware to ensure that the user is logged in before deleting a comment. 
router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;

    await Comments.destroy({where: {
        id: commentId,
    }})
    
    //error occurred when we didn't include this line. must return somethin
    res.json("deleted successfully")
})


module.exports = router;