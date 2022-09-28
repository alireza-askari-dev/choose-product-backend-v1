const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL);
        // console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
        console.log(`--- MongoDB Connected ----------->`.green);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;