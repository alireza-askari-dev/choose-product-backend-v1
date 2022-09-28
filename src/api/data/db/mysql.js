const mysql = require('mysql');

// conding mysql user and database
const connection = mysql.createConnection({
    host: 'gina.iran.liara.ir',
    user: 'root',
    port: 30655,
    password: 'xIRrJzV9M8QmpCMEDtvX7nRE',
    database: 'quirky_jang'
});

// connect to url string
// const connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');

const connectDB = () => {
    connection.connect(function (err) {
        if (err) {
            console.error(`--- Mysql Connected  ----------->`.red + err.stack);
            return;
        }
        console.log(`--- Mysql Connected  ----------->`.green);
    });

}

module.exports = {
    connectDB,
    connection,
};