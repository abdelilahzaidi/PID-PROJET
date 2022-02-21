const jwt = require("jsonwebtoken");
const config = require("./auth.config.js");
const {
    User,
    Role,
  } = require("../models/schema");

verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    return res.status(403).send({
      message: "Si vous n'avez pas de compte veuillez contacter un Fablab manager"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Accès non autorisé!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === "Admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requiert un compte admin"
      });
      return;
    });
  });
};

isAccountant = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === "Accountant") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requiert un compte comptable"
      });
    });
  });
};


isAdminOrsAccountant = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].role === "Admin" || roles[i].role === "Accountant") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Requiert un compte admin ou comptable"
      });
    });
  });
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAccountant: isAccountant,
  isAdminOrsAccountant : isAdminOrsAccountant
};
module.exports = authJwt;