const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");
const Wilder = require("../entity/Wilder");

module.exports = {
    create: async (req, res) => {
        const {name} = req.body
        if (name.length > 100 || name.length === 0) {
            return res
                .status(422)
                .send("the name should have a length  between 1 and 100 characters");
        }

        try {
            const created = await dataSource.getRepository(Skill).save({name})
            res
                .status(201)
                .send(created)
        } catch (err) {
            res.send("Sorry we can be create")
        }
    },
    read: async (req, res) => {
        try {
            const skills = await dataSource.getRepository(Skill).find();
            res.send(skills)
        } catch (err) {
            console.error(err)
            res.send('error skills not found')
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
                .getRepository(Skill)
                .update(req.params.id, req.body);
            if (affected) return res.send('skill updated');
            res.sendStatus(404);
        } catch (err) {
            console.error(err);
            res.send('error while updating wilder');
        }
    },
    delete: async (req, res) => {
        try {
            const {affected} = await dataSource
                .getRepository(Skill)
                .delete(req.params.id);
            if (affected)
                return res.send('skill deleted')
            res.sendStatus(404);
        } catch (err) {
            console.error(err);
        }
    },
}
