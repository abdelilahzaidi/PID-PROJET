
const invoice = require('../controllers/invoiceController')
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { verifyToken, isAdmin, isAccountant, isAdminOrsAccountant } = require("../controllers/authJwt");

router.get("/create", verifyToken, isAdminOrsAccountant,(req,res,next) =>{
    res.render("members/admins/crud/invoice-create", {title: "Click Fablab | Création Facture"})
})

router.post("/create-invoice",  verifyToken, isAdminOrsAccountant, [
    body('idUser').isInt(),
    body('begin_date').escape().trim(),
    body('end_date').escape().trim()
], invoice.create);

router.post("/details-invoice", verifyToken,isAdminOrsAccountant, invoice.detailsInvoice)


router.get("/", verifyToken, isAdminOrsAccountant, invoice.accountantRole);
router.get("/all-invoices", verifyToken, isAdminOrsAccountant , invoice.findAll)

router.get("/paid-invoice", verifyToken, isAdminOrsAccountant, (req,res) => {
    res.render("members/invoice-paid", {title : "Click Fablab | Paiement facture"})
})

router.post("/paid-invoice", verifyToken, isAdminOrsAccountant, invoice.paid, invoice.accountantRole)

router.get("/delete-invoice", verifyToken, isAccountant, (req,res) => {
    res.render("members/invoice-delete", {title : "Click Fablab | Supprimer facture"})
})

router.post("/delete-invoice", verifyToken, isAccountant, invoice.delete)
module.exports = router;