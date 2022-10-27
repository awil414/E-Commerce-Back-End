const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// GET all categories & their associated products
router.get('/', async (req, res) => {
  try {
    const categoryData =  await Category.findAll( 
      {
      include: [{ 
        model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // GET one category by its `id` value & associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData =  await Category.findByPk(req.params.id, {   
      // JOIN with ProductTag, using the Product through table
      include: [{ model: ProductTag, through: Product, as: 'tag_id' }]  //product_id?
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

 // CREATE a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // UPDATE a category by its `id` value
  router.update('/:id', async (req, res) => {
    try {
      const categoryData = await Category.update({
        where: {
          id: req.params.id
        }
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

  // DELETE a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const categoryData = await Category.destroy({
        where: {
          id: req.params.id
        }
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

module.exports = router;