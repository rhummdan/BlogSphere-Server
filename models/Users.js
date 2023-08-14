//model and table for Users
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    //comment out for now because we havent adjusted post table to fit this

    Users.associate = (models) => {

        Users.hasMany(models.Likes, {
            onDelete: "cascade",
        });

        Users.hasMany(models.Posts, {
            onDelete: "cascade",
        });
        
    }

    
    

    return Users;
}