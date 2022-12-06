const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()


router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {Category : true},
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
});

router.get('/categorys', async (req, res, next) => {
  try {
    const categorys = await prisma.category.findMany({
      include: {products : true},
    })
    res.json(categorys)
  } catch (error) {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      },
      include: {Category: true}
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});


router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id),
      }
    })
    res.json(deletedProduct)
  } catch (error) {
    next(error)
  }
});

// Delete ของใหญ่ ทื่เก็บ [ของเล็ก]
router.delete('/categorys/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedAllProduct = await prisma.product.deleteMany({
      where: {
        categoryId: Number(id),     // เช็คจาก id ความสัมพันธ์
      }
    })
    const deletedCategory = await prisma.category.delete({
      where: {
        id: Number(id),
      }
    })
    res.json(deletedCategory)
  } catch (error) {
    next(error)
  }
});


router.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await prisma.product.update({
      where: {
        id: Number(id)
      },
      data: req.body,
      include: {
        Category: true
      }
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
