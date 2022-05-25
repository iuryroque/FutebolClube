module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true }
  },
  { timestamps: false });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsTo(models.Category, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      onDelete: 'CASCADE',
    });
    models.Category.belongsTo(models.BlogPost, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      onDelete: 'CASCADE',
    });
  };
  PostCategory.associate = (model) => {
    model.BlogPost.belongsToMany(model.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    model.Category.belongsToMany(model.BlogPost, {
      as: 'posts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  }
  return PostCategory;
};
// const PostCategoryModel = (sequelize, _DataTypes) => {
//   const PostCategory = sequelize.define('PostCategories', {}, { timestamps: false });
//   PostCategory.associate = (models) => {
//     models.BlogPost.belongsToMany(models.PostCategory, {
//       as: 'categories',
//       through: PostCategory,
//       foreignKey: 'postId',
//       otherKey: 'categoryId',
//     });

//     models.Category.belongsToMany(models.BlogPost, {
//       as: 'BlogPosts',
//       through: PostCategory,
//       foreignKey: 'categoryId',
//       otherKey: 'postId',
//     });
//   };
//   return PostCategory;
// };

// module.exports = PostCategoryModel;