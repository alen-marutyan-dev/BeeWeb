const dotenv = require('dotenv');

dotenv.config();

const configEnv = {
    databaseUri: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET
}

module.exports = configEnv