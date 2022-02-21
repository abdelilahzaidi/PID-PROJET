const { Op } = require('sequelize');
const {Equipment, Use} = require('../models/schema');

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Il n y a pas de contenu',
    });
    return;
  }
  const equipment = {
    name: req.body.name,
    price: parseFloat(req.body.price),
  };
  await Equipment.create(equipment)
    .then((data) => {
      res.render('members/admins/admin', {
        title: 'Click Fablab | Partie Admin',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Il y a eu une erreur lors de la création d'entrée pour l'équipement",
      });
    });
};
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name
    ? {
        name: {
          [Op.like]: `%${name}%`,
        },
      }
    : null;

  Equipment.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Erreur lors de la recherche des machines',
      });
    });
};
exports.update = async (req, res) => {
  const id = req.body.id;
  const equipment = {
    name: req.body.name,
    price: req.body.price,
  };
  Equipment.update(equipment, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.render('members/admins/admin', {
          title: 'Click Fablab | Partie Admin',
        });
      } else {
        res.send({
          message: `Nous n'avons pas pu modifié l'équipement n°${id}. Peut-être la requête est mal écrite!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Erreur serveur lors de la modification de l'équipement n°${id}`,
      });
    });
};
exports.delete = async (req, res) => {
  const id = req.body.id;

  const findEquipmentUse = await Use.findAll({where : {equipmentId : id}})
  console.log(findEquipmentUse)
    if(findEquipmentUse.length === 0){


        Equipment.destroy({
            where: {
              id: id,
            },
          })
            .then((num) => {
              if (num == 1) {
                res.render('equipment', { title: 'Click Fablab | Partie Equipement' });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: `Erreur serveur lors de la suppression de l'équipement n°${id}`,
              });
            });
    }else {
        res.send({
          message: `Nous n'avons pas pu trouver l'équipement n°${id}. Peut-être n'est-il pas stocké dans notre base de donnée ou bien il est utilisé`,
        });
      }

};
