let envPath = `${__dirname}`;
switch (process.env.NODE_ENV) {
    case 'local': envPath += '/../.env.local'; break;
    case 'atlas': envPath += '/../.env.atlas'; break;
    default:
}

const env = require('dotenv').config({ path: envPath });
if (env.error) {
    console.log('Environment setup is incorrect, exit!');
    process.exit(0); // throw zero, to avoid npm errors
}
console.log('Environment variables:\n', env.parsed);

module.exports.DB_URL = `${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
module.exports.PORT = process.env.PORT;
