const express = require('express');
// creation de la vaiable router qui lit les infos de express
const router = express.Router();
// creer la premirer route
router.get('/', (req, res) => {
    res.send("users module");
})

//Exportation du module et affectation du module router

module.exports = router;