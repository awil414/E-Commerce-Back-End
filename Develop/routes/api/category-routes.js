const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint


router.get('/', (req, res) => {
  // Find all categories & their associated products
  try {
    const categoryData =  Category.findAll(  // AWAIT   wont let me use await
      {
      include: [
        {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  
router.get('/:id', (req, res) => {
  // Find one category by its `id` value & associated Products
  try {
    const categoryData =  Category.findByPk(req.params.id, {   // await ?
      // JOIN with Product, using the Trip through table
      include: [{ model: Tag, through: ProductTag, as: 'product_id' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;