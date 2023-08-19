module.exports = (sequelize, DataTypes) => {

    //variable that represents our model
    const Comments = sequelize.define("Comments", {
        
        //username col
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