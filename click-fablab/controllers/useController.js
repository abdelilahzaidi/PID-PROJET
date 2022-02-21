const { User, Role, Equipment, Use } = require('../models/schema');


exports.create = async(req, res) => {

    try{
        const equipment = await Equipment.findOne({
            where: {
                id: req.body.idEquipment
            }
        })
        let duration = parseFloat(req.body.duration)
        let price = parseFloat(equipment.price) * duration
        let use = await Use.create({
            duration: req.body.duration,
            date: Date.now(),
            price : price
        })
        const user = await User.findOne({
            where: {
                id: req.body.idUser
            }
        })
        use.setUser(user)
        use.setEquipment(equipment)
        res.render('use', { title: 'Click Fablab | Partie Utilisation' });
    }catch{
        res.status(400).send({
            message : "Erreur input, veuilez recommencer"
        })
    }

}

exports.delete = async (req, res) =>{

    try{
        const use = await Use.findOne({where : {
            id : req.body.id
        }})
       if(!use.invoiceId){

           use.destroy()

           res.render('use', { title: 'Click Fablab | Partie Utilisation' });
       }else{
           res.status(400).send({ message : "Impossible de supprimer l'utilisation est déjà facturé"})
       }

    }catch{
        res.status(500).send({message : "Erreur serveur"})
    }
}


exports.findAll = (req, res) => {
    Use.findAll({include : [User, Equipment]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Erreur lors de la recherche des roles"
            });
        });
};