module.exports = (sequelize, DataTypes) => {

    //model for comments table
    const Comments = sequelize.define("Comments", {
        
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        PostId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    
    return Comments
}