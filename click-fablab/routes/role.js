const role = require('../controllers/roleController.js');
const { verifyToken } = require('../controllers/authJwt');
const express = require('express');
const router = express.Router();

router.get('/', [verifyToken, isAdmin], (req, res, next) => {
  res.render('role', { title: 'Click Fablab | Partie Role' });
});

router.get('/create-role', [verifyToken, isAdmin], (req, res, next) => {
  res.render('members/admins/crud/create-role', {
    title: 'Click Fablab | Création Role',
  });
});

router.post('/create-role', [verifyToken, isAdmin], role.create);
router.get('/all-roles', [verifyToken, isAdmin], role.findAll);
module.exports = router;
