const Role = require("../models/role")

exports.create = async(req, res) => {

    if(req.body.role){
        const role = await Role.findOne({where : {
            role : req.body.role
        }})
        if(!role){
            Role.create({
                role: req.body.role,
            })
            .then(() => {
                    res.render("role", {title : "Click Fablab | Partie Role"})
                })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
        }else{
            res.status(409).send({ message: "Nom de rôle déjà pris" });}
    }else{
        res.status(400).send({ message: "Il n'y a pas de nom de rôle" });
    }
}


   
    

exports.findAll = (req, res) => {
    Role.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la recherche des roles"
            });
        });
};