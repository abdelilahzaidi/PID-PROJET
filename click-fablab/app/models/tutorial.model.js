module.exports = (sequelize, Sequelize) => {
    const Equipment = sequelize.define("equipment", {
      idEquipement: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      tarif: {
        type: Sequelize.FLOAT
      },
      isUsed: {
        type:Sequelize.BOOLEAN
      }


    });
  
    return Equipment;
  };