const { connection } = require("../data/db/mysql")
const e = require('express');
const anycHandler = require('express-async-handler');
// random id
const { v4: uuidv4 } = require('uuid');
// public directorys
const { savingUserDirectory, uploadUserDirectory } = require('../../config/public/publicDirectorys');
// message const
const { responseHandler, CustomMessages, DefultMessage, InputMessage } = require('../helper/consts/messageHandler');

//#region --- Create product 
// @route   POST /api/products/createProduct
// @access  public
const createProduct = anycHandler(async (req, res, next) => {
    const { name, barcode, image, imageID, userName } = req?.body;
    const product = {
        id: null,
        name: name,
        barcode: barcode,
        image: image,
        imageID: imageID,
        userName: userName,
    };

    if (!name) {
        responseHandler({ status: 500, message: InputMessage({ type: 'Required', input: 'name' }), data: null }, res)
    } else if (!barcode) {
        responseHandler({ status: 500, message: InputMessage({ type: 'Required', input: 'barcode' }), data: null }, res)
    } else if (!image) {
        responseHandler({ status: 500, message: InputMessage({ type: 'Required', input: 'image' }), data: null }, res)
    } else if (!userName) {
        responseHandler({ status: 500, message: InputMessage({ type: 'Required', input: 'user name' }), data: null }, res)
    } else {
        // create product
        connection.query(`SELECT * FROM products WHERE barcode = ${barcode}`, function (error, results, fields) {
            if (results?.length >= 1) {
                responseHandler({ status: 500, message: CustomMessages({ type: 'Exiest', model: 'product with this barcode' }), data: null }, res);
            } else {
                connection.query(`INSERT INTO products SET ?`, product, function (error, results, fields) {
                    if (error) {
                        responseHandler({ status: 500, message: error, data: null }, res);
                    } else {
                        responseHandler({ status: 200, message: CustomMessages({ type: 'Create', model: 'Product' }) }, res);
                    }
                });
            }
        });
    }
    // End -------------------------------------------------------------
})
//#endregion

//#region --- Product List 
// @desc    GET Product LIST
// @route   GET /api/products
// @access  public
const productList = anycHandler(async (req, res) => {
    // create product
    connection.query(`SELECT * FROM products`, function (error, results, fields) {
        if (results?.length >= 1) {
            responseHandler({ status: 200, message: DefultMessage('Success'), data: results }, res);
        } else {
            responseHandler({ status: 500, message: DefultMessage('NoProduct'), data: null }, res);
        }
    });
})
//#endregion

//#region --- Delete 
// @desc    DELETE Product BY ID
// @route   GET /api/products/:id
// @access  public
const deleteProduct = anycHandler(async (req, res) => {
    const ProductID = req.params.id;

    // Delete product
    connection.query(`SELECT * FROM products WHERE id = ${ProductID}`, function (error, results, fields) {
        if (results?.length >= 1) {
            connection.query(`DELETE FROM products WHERE products.id = ${ProductID}`, function (error, results, fields) {
                if (error) {
                    responseHandler({ status: 500, message: error, data: null }, res);
                } else {
                    responseHandler({ status: 200, message: CustomMessages({ type: 'Delete', model: 'Product' }) }, res);
                }
            });
        } else {
            responseHandler({ status: 500, message: CustomMessages({ type: 'Notxiest', model: 'This product' }), data: null }, res);
        }
    });
})
//#endregion

//#region --- Delete Image
// @desc    DELETE Product BY ID
// @route   GET /api/products/:id
// @access  public
const deleteImage = anycHandler(async (req, res) => {
    const ImageID = req.params?.id;
    const ImageUrl = req.body?.url;

    if (!ImageID?.length >= 1) {
        responseHandler({ status: 500, message: InputMessage({ type: 'Required', input: 'Image' }) }, res);
    } else {
        // Delete product
        connection.query(`DELETE FROM images WHERE productID = ${ImageID} AND url = ${JSON.stringify(ImageUrl)}`, function (error, results, fields) {
            if (error) {
                responseHandler({ status: 500, message: error, data: null }, res);
            } else {
                responseHandler({ status: 200, message: CustomMessages({ type: 'Delete', model: 'Image' }) }, res);
            }
        });
    }
})
//#endregion

//#region --- Get by id
// @desc    GET Product BY ID
// @route   GET /api/product/:id
// @access  public
const getProductByID = anycHandler(async (req, res) => {
    const ProductID = req.params.id;
    const ImageId = req.params.imgId;

    connection.query(`SELECT * FROM images WHERE imageID = ${JSON.stringify(ImageId)}`, function (error, Imageresults, fields) {
        console.log("ddd " + Imageresults)
        connection.query(`SELECT * FROM products WHERE id = ${ProductID}`, function (error, results, fields) {
            if (!results?.length >= 1) {
                responseHandler({ status: 500, message: CustomMessages({ type: 'Notxiest', model: 'This product' }), data: null }, res);
            } else {
                const ProductData = results[0];
                if (results?.length >= 1 && Imageresults?.length >= 1) {
                    responseHandler({
                        status: 200, message: DefultMessage('Success'), data: {
                            id: ProductData?.id,
                            name: ProductData?.name,
                            barcode: ProductData?.barcode,
                            images: Imageresults,
                            userName: ProductData?.userName,
                        }
                    }, res);
                } else {
                    responseHandler({
                        status: 200, message: DefultMessage('Success'), data: {
                            id: ProductData?.id,
                            name: ProductData?.name,
                            barcode: ProductData?.barcode,
                            userName: ProductData?.userName,
                            images: [{ url: ProductData?.image }],
                        }
                    }, res);
                }
            }

        });
    });
});
//#endregion

//#region --- Find Product by barcode
// @desc    GET Find Product BY barcode
// @route   GET /api/product/find/:barcode
// @access  public
const FindByBarcode = anycHandler(async (req, res) => {
    const ProductBarcode = req.params.barcode;

    connection.query(`SELECT * FROM products WHERE barcode = ${ProductBarcode}`, function (error, results, fields) {
        if (!results?.length >= 1) {
            responseHandler({ status: 500, message: DefultMessage('NoProduct'), data: null }, res);
        } else {
            responseHandler({
                status: 200, message: DefultMessage('Success'), data: results[0]
            }, res);
        }
    });
});
//#endregion

//#region --- Upload iamge
// @desc    UPLOAD USER PROFILE
// @route   GET /api/products/upload-image
// @access  public
const uploadImage = anycHandler(async (req, res) => {
    const ProductID = req.params.id;
    const PrID = req.params.pr;

    // cheking file
    if (!req.files) {
        res.status(500)
        throw new Error('No file uploaded')
    }

    //Use the name of the input field (i.e. "file") to retrieve the uploaded file
    const file = req.files.file;

    //Use the mv() method to place the file in upload directory (i.e. "uploads/images/profile/")
    const fileName = `${uuidv4()}.png`;
    file.mv(uploadUserDirectory + `${fileName}`);

    const image = `${savingUserDirectory}${fileName}`;

    const ImageItems = {
        id: null,
        url: image,
        productID: ProductID,
        imageID: PrID
    };
    connection.query(`INSERT INTO images SET ?`, ImageItems, function (error, results, fields) {
        if (error) {
            responseHandler({ status: 500, message: error, data: null }, res);
        } else {
            responseHandler({ status: 200, message: 'Image added successfully.', data: { url: image, productID: ProductID } }, res);
        }
    });
})
//#endregion

module.exports = {
    productList,
    deleteProduct,
    getProductByID,
    uploadImage,
    createProduct,
    FindByBarcode,
    deleteImage,
}