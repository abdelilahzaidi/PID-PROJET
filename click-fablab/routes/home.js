const express = require('express');
// creation de la vaiable router qui lit les infos de express
const router = express.Router();
// creer la premirer route
router.get('/home', (req, res) => {
    res.send('home');
})

//Exportation du module et affectation du module router

module.exports = router;