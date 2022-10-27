const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tagData =  await Tag.findAll( 
      {
      include: [{ 
        model: Product, 
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData =  Tag.findByPk(req.params.id, {   
      // JOIN with Product, using the ProductTag through table
      include: [{ model: Product, through: ProductTag, as: 'tag_id' }]  
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// CREATE (POST) a new tag
router.post('/', (req, res) => {
  try {
    const tagData = Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE (PUT) a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const tagData = Tag.update({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
