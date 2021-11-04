module.exports = app => {
    const equipment = require("../controllers/equipmentController.js");
  
    var router = require("express").Router();
  
    // Create a new equipment
    router.post("/", equipment.create);
  
    // Retrieve all equipments
    router.get("/", equipment.findAll);
  
    // Retrieve all published equipments
    router.get("/published", equipment.findAllPublished);
  
    // Retrieve a single equipment with id
    router.get("/:id", equipment.findOne);
  
    // Update a equipment with id
    router.put("/:id", equipment.update);
  
    // Delete a equipment with id
    router.delete("/:id", equipment.delete);
  
    // Delete all equipments
    router.delete("/", equipment.deleteAll);
  
    app.use('/api/equipment', router);
  };