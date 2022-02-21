const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('home', { title: 'Click-Fablab' });
  });

module.exports = router;