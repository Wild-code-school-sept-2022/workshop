const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");

module.exports = {
    create: async (req, res) => {
        /* On récupère l'information qui nous intéresse dans le body, et on traite la donnée
        si elle rentre dans la condition alors.*/
        const {name} = req.body;
        if (name.length > 100 || name.length === 0) {
            return res
                .status(422)
                .send('the name should have a length  between 1 and 100 characters');
        }
        /* Si la donnée est ok alors on envoie en DB avec un try */
        try {
            /* On fait une promesse avec await si elle est ok alors on renvoie l'objet created avec un code 201. */
            const created = await dataSource.getRepository(Wilder).save({name});
            res.status(201).send(created);
        }
            /* Si la promesse n'est pas Ok on renvoie une erreur. */ catch (err) {
            console.error(err)
            res.send('error while creating wilder')
        }
    },
    read: async (req, res) => {
        try {
            const wilders = await dataSource.getRepository(Wilder).find();
            res.send(wilders)
        } catch (err) {
            console.error(err)
            res.send('error wilders not found')
        }
    },
    update: async (req, res) => {
        const {name} = req.body;
        if (name.length > 100 || name.length === 0) {
            return res
                .status(422)
                .send('the name should have a length between 1 and 100 characters');
        }

        try {
            const {affected} = await dataSource
                .getRepository(Wilder)
                .update(req.params.id, req.body);
            if (affected) return res.send('wilder updated');
            res.sendStatus(404);
        } catch (err) {
            console.error(err);
            res.send('error while updating wilder');
        }
    },


    delete: async (req, res) => {
        try {
            const {affected} = await dataSource
                .getRepository(Wilder)
                .delete(req.params.id);
            if (affected)
                return res.send('wilder deleted')
            res.sendStatus(404);
        } catch (err) {
            console.error(err);
        }
    },
}
;