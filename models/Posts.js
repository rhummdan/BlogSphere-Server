//model for posts table
module.exports = (sequelize, DataTypes) => {

    //variable that represents our model
    const Posts = sequelize.define("Posts", {
        //title column
        title: {
            type: DataTypes.STRING,
            allowNull: false, //required
        },
        //post text col
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //username col
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    });


    Posts.associate = (models) => {
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        })
    }
    return Posts
}