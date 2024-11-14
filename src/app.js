const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const usersRouter = require("../routes/users");
const showsRouter = require("../routes/shows");

app.use("/users", usersRouter);
app.use("/shows", showsRouter);

module.exports = app;