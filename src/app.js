require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const DmRouter = require('./routes/dm.routes');

app.use(bodyParser.json());

DmRouter.routesConfig(app);

const port = process.env.BABYMON_API_PORT || 3000;
app.listen(port, function () {
    console.log('App listening at port %s in DEBUG MODE', port);
    if(process.env.DM4TELEGRAF_DEBUG === 'true') {
        console.log("Loaded .env file: %O", require('dotenv').config().parsed);
        console.log("Loaded environment variabes: %O", process.env);
    }
});
