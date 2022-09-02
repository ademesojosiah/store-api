const express = require('express')
const router = express.Router()
const {getAllProducts,getStaticProducts } = require('../controller/product')

router.route('/').get(getAllProducts)
router.route('/static').get(getStaticProducts)

module.exports = router