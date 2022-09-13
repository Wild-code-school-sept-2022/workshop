const express = require("express");
const dataSource = require("./utils").dataSource;
const dataSource2 = require("./utils").dataSource2;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");

const app = express();

app.use(express.json());

app.post("/wilders", wilderController.create);
app.post("/skills", skillController.create);
app.get("/wilders", wilderController.read)
//app.get("/skills", wilderController.read)
app.patch("/wilders/:id", wilderController.update)
//app.patch("/skills/:id", wilderController.update)
app.delete("/wilders/:id", wilderController.delete)
//app.delete("/skills/:id", wilderController.delete)

const start = async () => {
    await dataSource.initialize();
    await dataSource2.initialize();
    app.listen(3000, () => {
        console.log("Server started on 3000");
    });
};

start();