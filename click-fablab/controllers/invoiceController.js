const { Op } = require('sequelize');
const { User, Role, Equipment, Use, Invoice } = require('../models/schema');
global.atob = require('atob');
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
  const idUser = parseJwt(req.cookies.token);
  const invoiceTab = await Invoice.findAll();
  let sequence = 0;
  const use = await Use.findAll({
    where: {
      [Op.and]: [
        { userId: req.body.idUser }, 
        { invoiceId: null }
      ],
      date: { [Op.between]: [req.body.begin_date, req.body.end_date] },
    },
  });
  if (use.length >= 1) {
    let totalAmount = 0.0;
    use.forEach((element) => {
      totalAmount = parseFloat(element.price) + totalAmount;
    });
    let nameDate = req.body.end_date.split('-');
    console.log(invoiceTab)
  if(invoiceTab.length > 0){
    const monthDate = invoiceTab[invoiceTab.length-1].date_end.getMonth()+1
    const strMonth = monthDate.toString().padStart(3,'0')
    if(strMonth != req.body.end_date.split('-')[1].padStart(3, '0')){
      sequence = 0
    }else{
      sequence++
    }

  }
    let nameInvoice =
      nameDate[0].toString() +
      nameDate[1].toString() +
      sequence.toString().padStart(3, '0');
    const invoice = await Invoice.create({
      name: nameInvoice,
      date_begin: req.body.begin_date,
      date_end: req.body.end_date,
      total_amount: totalAmount,
      paid: false,
    });
    invoice.setUses(use);
    invoice.setUser(parseInt(req.body.idUser));
    let user = await User.findOne({
      where: {
        id: idUser.id,
      },
      include: Role,
    });
    let accountant = [];

    user.roles.forEach((element) => {
      if (element.role == 'Accountant') {
        accountant.push(element.role);
      }
    });
    res.render('invoice', {
      title: 'Click Fablab | Partie Facture',
      roleAccountant: accountant,
    });
  } else {
    res.status(400).send({
      message: "Il n y a aucune utilisation qui n'a pas été déjà comptabilisé",
    });
  }
};

exports.findAll = (req, res) => {
  Invoice.findAll({ include: User })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la recherche de facture',
      });
    });
};

exports.detailsInvoice = async (req, res) => {
  const use = await Use.findAll({
    where: { invoiceId: req.body.id },
    include: Equipment,
  });
  res.render('members/my-uses', {
    title: 'Click Fablab | Details facture',
    tabUse: use,
  });
};

exports.delete = (req, res) => {
  const idUser = parseJwt(req.cookies.token);
  Invoice.destroy({
    where: {
      [Op.and]: [{ id: req.body.id }, { paid: false }],
    },
  })
    .then(async (num) => {
      if (num == 1) {
        let user = await User.findOne({
          where: {
            id: idUser.id,
          },
          include: Role,
        });
        let accountant = [];

        user.roles.forEach((element) => {
          if (element.role == 'Accountant') {
            accountant.push(element.role);
          }
        });
        res.render('invoice', {
          title: 'Click Fablab | Partie Facture',
          roleAccountant: accountant,
        });
      } else {
        res.send({
          message: `Nous n'avons pas pu trouver la facture n°${req.body.id}. Peut-être n'est-elle pas stocké dans notre base de donnée`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err +
          `Erreur serveur lors de la suppression de la facture n°${req.body.id}`,
      });
    });
};

exports.accountantRole = async (req, res) => {
  const idUser = parseJwt(req.cookies.token);
  const user = await User.findOne({
    where: {
      id: idUser.id,
    },
    include: {
      model: Role,
    },
  });

  let accountant = [];
  user.roles.forEach((element) => {
    if (element.role == 'Accountant') {
      accountant.push(element.role);
    }
  });

  res.render('invoice', {
    title: 'Click Fablab | Partie Facture',
    roleAccountant: accountant,
  });
};

exports.paid = async (req, res) => {
  const invoice = await Invoice.findOne({ where: { id: req.body.id } });

  if (!invoice) {
    return res.status(401).send({
      message: 'Numéro de facture invalide !',
    });
  }
  invoice.paid = true;
  invoice.save();
  const idUser = parseJwt(req.cookies.token);
  const user = await User.findOne({
    where: {
      id: idUser.id,
    },
    include: {
      model: Role,
    },
  });

  let accountant = [];
  user.roles.forEach((element) => {
    if (element.role == 'Accountant') {
      accountant.push(element.role);
    }
  });

  res.render('invoice', {
    title: 'Click Fablab | Partie Facture',
    roleAccountant: accountant,
  });
};
