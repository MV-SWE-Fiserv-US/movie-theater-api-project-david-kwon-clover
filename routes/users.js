const express = require("express");
const usersRouter = express.Router();
const { User } = require("../models");

usersRouter.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch {
        next(error);
    }
})

module.exports = usersRouter;