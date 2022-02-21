const use = require('../controllers/useController.js');
const { verifyToken } = require('../controllers/authJwt');
const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');

router.get('/', [verifyToken, isAdmin], (req, res, next) => {
  res.render('use', { title: 'Click Fablab | Partie Utilisation' });
});

router.get('/create', [verifyToken, isAdmin], (req, res, next) => {
  res.render('members/admins/crud/create-use', {
    title: 'Click Fablab | Création Utilisation',
  });
});

router.get('/delete-use', [verifyToken, isAdmin], (req, res, next) => {
  res.render('members/admins/crud/delete-use', {
    title: 'Click Fablab | Suppression Utilisation',
  });
});

router.post('/create-use', [verifyToken, isAdmin], use.create);
router.post('/delete-use', [verifyToken, isAdmin], use.delete);

router.get('/all-uses', [verifyToken, isAdmin], use.findAll);

module.exports = router;
