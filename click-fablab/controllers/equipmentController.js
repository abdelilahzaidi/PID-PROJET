const db = require("../models");
const equipment = db.equipment;
const Op = db.Sequelize.Op;
let id_equipment = 0;

// Create and Save a new equipment
exports.create = (req, res) => {  
    if (!req.body.name) {
      res.status(400).send({
        message: "Il n y a pas de contenu"  
      });
      return;
    }
  
    // Create a equipment
    const equipment = {
      name: req.body.name,
      price: parseInt(req.body.price),
      isUsed: req.body.isUsed ? req.body.isUsed : false
    };
  
    // Save equipment in the database
    equipment.create(equipment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || ``
        });
      });
  };

// Retrieve all equipments from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    equipment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving equipments."
        });
      });
  };
  

// Find a single equipment with an id
exports.findOne = (req, res) => {
    const idEquipment = req.params.id_equipement;
  
    equipment.findByPk(idEquipment)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Nous n'avons pas pu trouver l'équipement n°${idEquipment}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Erreur serveur équipement n° " + ${idEquipment}`
        });
      });
  };
  

// Update a equipment by the id in the request
exports.update = (req, res) => {
    const idEquipment = req.params.id_equipment;
  
    equipment.update(req.body, {
      where: { id_equipment: idEquipment }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La equipment a été modifié avec succès"
          });
        } else {
          res.send({
            message: `Nous sommes navrés mais nous n'avons pas pu modifié la equipment n°${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Erreur serveur pour la equipment ${idEquipment}`
        });
      });
  };

// Delete a equipment with the specified id in the request
exports.delete = (req, res) => {
    const idEquipment = req.params.id_equipment;
  
    equipment.destroy({
      where: { id_equipment: idEquipment }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `La equipment a été supprimée avec succès`
          });
        } else {
          res.send({
            message: `Nous sommes navrés nous n'avons pas pu supprimer la equipment n°${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Erreur serveur equipment n° ${idEquipement}`
        });
      });
  };

// Delete all equipments from the database.
exports.deleteAll = (req, res) => {
    equipment.destroy({
      where: {},
      truncate: false
    })
      .then(id_equipments => {
        res.send({ message: `Les equipments ${id_equipments} ont été supprimé avec succès !` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur serveur lors de la suppression des entrées la table equipment"
        });
      });
  };

// Find all published equipments
exports.findAllPublished = (req, res) => {
    equipment.findAll({ where: { isUsed: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur lors de la recherche des équipements en cours d'utilisation"
        });
      });
  };