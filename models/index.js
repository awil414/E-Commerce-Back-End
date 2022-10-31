// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // IS THIS RIGHT?
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false   // IS THIS RIGHT?
  },
  // Define an foreignKey for when data is retrieved
  foreignKey: 'product_id'  // SHOULD THIS BE FOREIGN KEY?
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  // foreignKey
  foreignKey: 'tag_id' // FOREIGN KEY??
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};