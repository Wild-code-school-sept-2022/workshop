const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
    create: async (res, req) => {
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
}
