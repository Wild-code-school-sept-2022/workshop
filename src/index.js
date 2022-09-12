

const express = require("express");
const typeorm = require("typeorm");
const Wilder = require("./entity/Wilder");
const {createQueryBuilder} = require("typeorm/globals");

const app = express();

const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [require("./entity/Wilder")]
})

app.get("/", (req, res) => {
    res.send("Hello World");
});

const start = async () => {
    await dataSource.initialize();
    insert();
    dataSource.getRepository(Wilder).save({name: "First Wilder"});
    app.listen(3000, () => console.log("Server started on 3000"))
};

const insert = async () => {
    await dataSource
    .createQueryBuilder()
        .insert()
        .into(Wilder)
        .values([
            {name: "David"},
            {name: "Yoan"},
        ])
        .execute()
}


start();