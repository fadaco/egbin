const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var cors = require('cors')


dotenv.config({path: './config/.env'});

const http = require('http');
// Set up the express app
const app = express();
app.use(cors())

// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const models = require('./models');
models.sequelize.sync().then(() => {console.log('Nice database')})
                        .catch((err) => {console.log('something wrong')})

require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
message: 'Welcome to the beginning of nothingness.',
}));
const port = parseInt(process.env.PORT, 10) || 5500;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;