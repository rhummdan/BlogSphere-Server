//This file contains the export function which will generate the posts table in mysql
//This is also the model for a post
//this is how you export variable from NODEJS file
module.exports = (sequelize, DataTypes) => {

    //variable that represents our model
    const Posts = sequelize.define("Posts", {
        //title column
        title: {
            type: DataTypes.STRING,
            //doesn't allow there to be no title
            allowNull: false,
        },
        //post text col
        postText: {
            type: DataTypes.STRING,
            //doesn't allow there to be no title
            allowNull: false,
        },
        //username col
        username: {
            type: DataTypes.STRING,
            //doesn't allow there to be no title
            allowNull: false,
        },

    });

    //function to associate post with comments. the models argument is just an argument that has acccess to all the models in the project
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",    //when post is deletd, every one of its comments will also be deleted
        }); //each post may have many comments. This makes it so that every row in the comments table has a PostId
    }

    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        })
    }
    return Posts
}