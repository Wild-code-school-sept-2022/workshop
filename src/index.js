const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controller/wilder");
const skillController = require("./controller/skill");

const app = express();

app.use(express.json());

app.post("/wilders", wilderController.create);
app.get("/wilders", wilderController.read)
app.patch("/wilders/:id", wilderController.update)
app.delete("/wilders/:id", wilderController.delete)

app.post("/skills", skillController.create);
app.patch("/skills/:id", skillController.update)
app.get("/skills", skillController.read)
app.delete("/skills/:id", skillController.delete)

const start = async () => {
    await dataSource.initialize();
    app.listen(3000, () => {
        console.log("Server started on 3000");
    });
};

start();