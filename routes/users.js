const express = require("express");
const usersRouter = express.Router();
const { User, Show } = require("../models");

usersRouter.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        res.json(allUsers);
    } catch(error) {
        next(error);
    }
})

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const targetUser = await User.findByPk(req.params.id);
        res.json(targetUser);
    } catch(error) {
        next(error)
    }
})

usersRouter.get("/:id/shows", async (req, res, next) => {
    try {
        const targetUser = await User.findOne({
            where: { id: req.params.id },
            include: Show
        });
        res.json(targetUser);
    } catch(error) {
        next(error)
    }
})

module.exports = usersRouter;