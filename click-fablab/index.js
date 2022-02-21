const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require("debug")("fablab:config");

const app = express();

debug("Configuring app server");
require('dotenv').config();

const port = process.env.PORT || 3000;

const homeRouter = require("./routes/home");
const apiEquipmentRouter = require("./routes/equipment");
const apiUserRouter = require("./routes/user");
const apiRoleRouter = require("./routes/role");
const apiUseRouter = require("./routes/use");
const apiInvoiceRouter = require("./routes/invoice");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname , '/assets')))
app.use(cookieParser());

app.use('/', homeRouter)
app.use('/api/equipment', apiEquipmentRouter)
app.use('/api/user', apiUserRouter)
app.use('/api/role', apiRoleRouter)
app.use('/api/use', apiUseRouter)
app.use('/api/invoice', apiInvoiceRouter);
debug("App server configured");




//création du serveur
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
}); // le port je le passe dans la methode liesten et je le declenche dans la methode associé à liesten