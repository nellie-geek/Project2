module.exports = function (sequelize, DataTypes) {

    var Florida_man = sequelize.define("Florida_man", {
        headline: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pub_date: DataTypes.STRING,
        image_url: DataTypes.STRING,
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        url: DataTypes.STRING,
        meta_tag1: DataTypes.STRING,
        meta_tag2: DataTypes.STRING,
        upvote: DataTypes.INTEGER,
        downvote: DataTypes.INTEGER
    });
    return Florida_man;
};