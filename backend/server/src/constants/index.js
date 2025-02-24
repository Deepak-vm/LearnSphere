const path  = require('path');
require('dotenv').config({ path: path.join(__dirname , '../../.env') });

const PORT = process.env.PORT || 3005;  
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';

console.log('PORT:', PORT); // Debug log
console.log('SERVER_URL:', SERVER_URL); // Debug log

module.exports = {
    PORT,
    SERVER_URL
};