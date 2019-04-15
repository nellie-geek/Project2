module.exports = function (sequelize, DataTypes) {

    var Florida_man = sequelize.define("Florida_man", {
        headline: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pub_date: DataTypes.DATE,
        image_url: DataTypes.STRING,
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        url: DataTypes.STRING,
        meta_tags: DataTypes.STRING,
        upvote: DataTypes.INTEGER,
        downvote: DataTypes.INTEGER
    });
    return Florida_man;
};