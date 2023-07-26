const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'booking_appointment_app',
    password:'Mohit@12345'

});
module.exports =pool.promise();
