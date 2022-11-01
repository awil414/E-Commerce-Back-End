// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', 
});

// Products belongToMany Tags 
Product.belongsToMany(Tag, {
  // Define sthe third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false  
  },
  // Defines a foreignKey for when data is retrieved
  foreignKey: 'product_id' 
});

// Tags belongToMany Products 
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  // foreignKey
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};