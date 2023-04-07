const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Quest extends Model {}

Quest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            // allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quest_title: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        quest_setting: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        quest_challenge: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        quest_text: {
            type: DataTypes.TEXT,
            // allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User',
                key: 'id'
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'quest',
    }
);

module.exports = Quest;