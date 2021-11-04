const path = require('path')
    //Importation de express
const express = require('express');

const bodyParser = require('body-parser');
const cors = require("cors");
// app recoit expressions
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };


require('dotenv').config();

//creation du'une var port
const port = process.env.PORT || 3000;


const registerRoute = require('./routes/register');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))

app.use('/', registerRoute)

const db = require("./app/models");
db.sequelize.sync();

// Pour tester, on fait une methode get
app.get('/', (req, res) => {
    res.send({ message: 'Salam mes chers developpeurs' })

})

require("./app/routes/tutorial.routes")(app);



//création du serveur
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
}); // le port je le passe dans la methode liesten et je le declenche dans la methode associé à liesten