const express = require('express');
const router = express.Router();

const {
    createProduct,
    productList,
    deleteProduct,
    getProductByID,
    uploadImage,
    FindByBarcode,
    deleteImage,
} = require('../controllers/userController');

// Send Verify Code SMS
router.post('/createProduct', createProduct);
// get produtcs
router.get('/', productList);
// get produtc by id
router.get('/:id/:imgId', getProductByID);
// get produtc by barcode
router.get('/find/:barcode', FindByBarcode);
// delete produtc by id
router.delete('/:id', deleteProduct);
// delete image by id
router.delete('/delete-image/:id', deleteImage);
// upload product image
router.post('/upload-image/:id/:pr', uploadImage);

module.exports = router
