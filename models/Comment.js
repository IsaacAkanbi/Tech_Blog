const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    // timestamps: true,
    // freezeTableName: true,
    // underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;

// id: {
//   type: DataTypes.INTEGER,
//   allowNull: false,
//   primaryKey: true,
//   autoIncrement: true,
// },
// comment: {
//   type: DataTypes.STRING,
// },
// date_created: {
//   type: DataTypes.DATE,
//   allowNull: false,
//   defaultValue: DataTypes.NOW,
// },
// user_id: {
//   type: DataTypes.INTEGER,
//   references: {
//     model: 'User',
//     key: 'id',
//   },
// },
// post_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'Post',
//       key: 'id',
//     },
// },