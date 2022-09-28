// mrx : modules
const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
// mrx : swagger
// mrx : using .env file in our code -----------------------------------
const dotenv = require('dotenv').config();
// mrx : End ----------------------------------------------------------

// mrx : directorys Start ---------------------------------------------
const { connectDB, connection } = require('./api/data/db/mysql');
const { errorHandler } = require('./api/middleware/errorMiddleware');
// mrx : End ----------------------------------------------------------

// mrx : routers Start ------------------------------------------------
const BaseRouter = require('./api/routers/index');
const productRoutes = require('./api/routers/productRoutes');
// mrx : End ----------------------------------------------------------


// mrx : connect to mongodb Start ------------------------------------
connectDB()
// mrx : End ----------------------------------------------------------

const app = express();

// mrx : make req.body to json *
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mrx : public route for files
app.use(express.static('public'));

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));

// mrx : main router Start --------------------------------------------
app.use(BaseRouter.ProductsRoute, productRoutes);
// mrx : End ----------------------------------------------------------

// mrx : error handler middleware -------------------------------------
app.use(errorHandler);

// mrx : Starting server ----------------------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(colors.blue(`--- Server start on port ${colors.green(port)} --->`)));