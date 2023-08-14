const express = require("express");
const router = express.Router();
const {Likes} = require("../models")
const {validateToken} = require("../middlewares/AuthMiddleware")

router.post("/", validateToken, async (req, res) => {
    const {PostId} = req.body;
    const UserId = req.user.id;

    //searching likes table and finding a row where the where matches. This tells us if a specific user liked a specific post
    const found = await Likes.findOne({where: {PostId: PostId, UserId: UserId}});

    //if user hasn't liked the post, it will add a like
    if(!found) {
        await Likes.create({PostId: PostId, UserId: UserId});
        res.json({liked: true});
    } else {    //if user has already liked the post, like will be deleted
        await Likes.destroy({where: {PostId: PostId, UserId: UserId}});

        res.json({liked: false});
    }
});

module.exports = router;