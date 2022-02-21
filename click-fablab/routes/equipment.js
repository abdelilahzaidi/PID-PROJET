const equipment = require("../controllers/equipmentController.js");
const { verifyToken } = require("../controllers/authJwt");
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const regexIsUsed = /('true'|'false')/


router.get('/create', [verifyToken,isAdmin],(req, res, next) => {
    res.render("equipment-create", {title : "Click Fablab | Création Équipement"});
  });

router.get('/', [verifyToken,isAdmin], (req,res,next) =>{
  res.render('equipment', {title: "Click Fablab | Partie Equipement"})
})

router.get('/modify-equipment', [verifyToken,isAdmin], (req,res,next) =>{
  res.render('modify-equipment', {title : "Click Fablab | Modification Equipement"})
})

router.post("/modify-equipment", [verifyToken,isAdmin], [
  body('name').escape().trim(),
  body('price').isFloat(),
], equipment.update);

router.get("/delete-equipment", [verifyToken,isAdmin], (req,res,next) =>{
  res.render('members/admins/crud/delete-equipment', {title : "Click Fablab | Suppression Equipment"})
})
router.post("/delete-equipment", [verifyToken,isAdmin], [
  body('id').isInt(),
], equipment.delete);

router.post("/", [verifyToken,isAdmin], [
    body('name').escape().trim(),
    body('price').isFloat(),
], equipment.create);


router.get("/all-equipment", equipment.findAll);




module.exports = router;