const user = require("../controllers/userController.js");
const { verifyToken } = require("../controllers/authJwt");
const express = require('express');
const router = express.Router();
const { body, check } = require('express-validator');
const checkDuplicateEmail = require("../controllers/checkEmail");
const User = require("../models/user.js");
const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const regexNumber = /([+]32){1}[0-9]{6,9}/

router.get(
    "/admin", [verifyToken, isAdmin],
    user.adminBoard
);

router.post("/", [
    body('first_name').notEmpty().trim().escape(),
    body('last_name').trim().escape(),
    body('email').trim().escape(),
    body('email').matches(regexEmail),
    check('password')
    .isLength({ min: 5 })
    .withMessage('Doit avoir plus de 5 caractères')
    .matches(/\d/)
    .withMessage('Doit contenir un chiffre'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Les deux passwords ne matchent pas, veuillez réessayer');
        }

        // Indicates the success of this synchronous custom validator
        return true;
    }),
    checkDuplicateEmail
], user.create);

router.get("/register", (req, res, next) => {
    res.render("register", { title: "Click Fablab | Création Login" })
})
router.get("/invoice", verifyToken, user.invoice)


router.get("/login", (req, res, next) => {
    res.render("login")
})
router.get("/modify-user",verifyToken, (req, res, next) => {
    res.render("members/modify-user")
})
router.post("/modify-user",verifyToken,[
    body('address').notEmpty().trim().escape(),
    body('telephone').notEmpty().trim().escape().matches(regexNumber),
    check('password')
    .isLength({ min: 5 })
    .withMessage('Doit avoir plus de 5 caractères')
    .matches(/\d/)
    .withMessage('Doit contenir un chiffre'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Les deux passwords ne matchent pas, veuillez réessayer');
        }
        return true;
    })], user.modify)
router.post("/logout", user.postLogout)


router.post("/login", user.signin, user.findUserRole)

router.get("/user-panel",verifyToken, user.findUserRole, )

router.get("/reservation-equipment", verifyToken, (req, res, next) => {
    res.render("reservation-equipment", { title: "Click Fablab | Réservation équipement" })
})

router.post("/reservation-equipment", verifyToken, user.reservationEquipment, user.findUserRole)

router.get("/my-uses", verifyToken, user.uses)

router.get("/all-users",verifyToken, user.findAll);

router.get("/", verifyToken, isAdmin, (req, res, next) => {
    res.render("members/admins/crud/user-role", { title: "Click Fablab | Partie utilisateur" })
})

router.get("/change-role", verifyToken, isAdmin, (req, res, next) => {
    res.render("members/admins/crud/change-role", { title: "Click Fablab | Changer rôle utilisateur" })
})

router.post("/change-role", verifyToken, isAdmin, user.changeRole)

router.post("/tab-user", verifyToken, isAdmin, user.redirect)
module.exports = router;