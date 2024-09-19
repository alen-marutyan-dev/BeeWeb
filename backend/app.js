const express = require('express');
const dbConnection = require('./config/dbConfig');
const dotenv = require('dotenv');
const indexRoute = require('./routes');
const { errorHandler } = require('./middleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());


(async () => {
    await dbConnection();
})();

app.use('/api', indexRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});