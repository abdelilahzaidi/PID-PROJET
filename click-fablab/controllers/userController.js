const { Op } = require('sequelize');
const { User, Role, Equipment, Use, Invoice } = require('../models/schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../controllers/auth.config');
const { body, validationResult, check } = require('express-validator');
global.atob = require("atob");
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  return JSON.parse(jsonPayload);
}

exports.create = async (req, res) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    return `${location}[${param}]: ${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res.json({ errors: result.array() });
  }

  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.render('login', { title: 'Click Fablab | Partie Login' });
          });
        });
      } else {
        // user role = 1
        user.setRoles([2]).then(() => {
          res.render('login', { title: 'Click Fablab | Partie Login' });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  const user = await User.findOne({
    where : {
      email: req.body.email,
    },
    include :{
      model : Role
    }
  })
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      accessToken: null,
      message: 'Email ou password invalide',
    });
  }

  var token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400, // 24 hours
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
  });

  res.redirect("/api/user/user-panel")

};

exports.postLogout = (req, res) => {
  cookie = req.cookies;
  cookie;
  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    res.cookie(prop, '', { expires: new Date(0) });
  }
  res.redirect('/');
};

exports.findAll = (req, res) => {
  User.findAll({include : Role})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la recherche des utilisateurs',
      });
    });
};

exports.modify = async (req, res) => {
  const idUser = parseJwt(req.cookies.token);
  const userFind = await User.findOne({
    where: {
      id: idUser.id,
    },
  });
  const passwordIsValid = bcrypt.compareSync(
    req.body.old_password,
    userFind.password
  );
  if (passwordIsValid) {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `${location}[${param}]: ${msg}`;
    };
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    }
    const user = {
      first_name: userFind.first_name,
      last_name:  userFind.last_name,
      address : req.body.address,
      phone_number : req.body.telephone,
      email: userFind.email,
      password: bcrypt.hashSync(req.body.password, 8)
        ? bcrypt.hashSync(req.body.password, 8)
        : userFind.password,
    };
    User.update(user, {
      where: { id: idUser.id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "L'utilisateur a été modifié avec succès",
          });
        } else {
          res.send({
            message: `Nous n'avons pas pu modifié l'utilisateur n°${id}. Peut-être la requête est mal écrite!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err`Erreur serveur lors de la modification de l'utilisateur n°${id}`,
        });
      });
  } else {
    res.status(400).send({
      message: "L'ancien mot de passe ne correspond pas",
    });
  }
};

exports.invoice = async (req,res,next) =>{
  const idUser = parseJwt(req.cookies.token);
  const tabInvoice = await Invoice.findAll({where: {
    userId : idUser.id
  }})

  res.render("invoice-list", {title : "Click Fablab | Liste de facture", tabInvoice : tabInvoice})
}

exports.reservationEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findOne({
      where: {
        id: req.body.id,
      },
    });
    const idUser = parseJwt(req.cookies.token);
    let use = await Use.create({
      duration: req.body.duration,
      date: Date.now(),
      price: equipment.price * req.body.duration,
    });
    const user = await User.findOne({
      where: {
        id: idUser.id,
      },
    });
    use.setUser(user);
    use.setEquipment(equipment);
    next()
  } catch {
    res
      .status(400)
      .send({
        message: 'Mauvaise information dans le formulaire de réservation',
      });
  }
};

exports.findUserRole = async (req, res) => {

  res.render('members/user', {
    title: 'Click Fablab | User Panel',
  });
};

exports.uses = async (req, res) => {
  const idUser = parseJwt(req.cookies.token);
  const uses = await Use.findAll({
    where: {
      userId: idUser.id,
    },
    include: {
      model: Equipment,
    },
  });
  res.render('members/my-uses', {
    title: 'Click Fablab | Mes utilisations',
    tabUse: uses,
  });
};

exports.redirect = async (req, res) =>{
  let page = req.body.id.split(":")[0]
  let id = req.body.id.split(":")[1]

  if(page == "invoice"){
    let invoices = await Invoice.findAll({where : {userId : id}})
    res.render("invoice-list", {title : "Click Fablab | Partie facture", tabInvoice : invoices })
  }
  else if(page == "use"){
    let uses = await Use.findAll({include : Equipment, where : {userId : id}},)
    res.render("members/my-uses", {title : "Click Fablab | Partie Utilisation", tabUse : uses })
  }else {
    res.status(404).send({message : "Nous n'avons pas pu trouvé ce que vous recherché"})
  }

}

exports.userPanel = async (req, res) => {
  const idUser = parseJwt(req.cookies.token);
  const userRole = await User.findOne({
    where: {
      id: idUser.id,
    },
    include:{
      model : Role
    }
  });
  let role = [];
  let roleAccountant = [];
  userRole.roles.forEach(element => {
    if(element.role == "Admin"){
      role.push(element.role)
    }else if (element.role == "Accountant"){
      roleAccountant.push(element.role)
    }
  });

};

exports.changeRole = async (req, res) => {
  const idUser = parseJwt(req.cookies.token);
  const user = await User.findOne({where :{ id : req.body.user}})
  const role = await Role.findOne({where :{ id : req.body.role}})

  if(!user || !role){
   return res.status(403).send({message : "Role ou Utilisateur non trouvé"})
  }
  user.setRoles(role)
  const userRole = await User.findOne({
    where: {
      id: idUser.id,
    },
    include:{
      model : Role
    }
  });
  let authorities = [];
  let roleAccountant = [];
  userRole.roles.forEach(element => {
    if(element.role == "Admin"){
      authorities.push(element.role)
    }else if (element.role == "Accountant"){
      roleAccountant.push(element.role)
    }
  });

  res.render('members/user', {
    title: 'Click Fablab | User Panel',
    role: authorities,
    roleAccountant : roleAccountant
  });
};



exports.adminBoard = (req, res) => {
  res.render('members/admins/admin', { title: 'Click Fablab | Partie Admin' });
};
