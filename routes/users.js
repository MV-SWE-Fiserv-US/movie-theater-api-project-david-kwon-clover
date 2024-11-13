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

usersRouter.put("/:userId/shows/:showId", async (req, res, next) => {
    const { userId, showId } = req.params;
    try {
        const targetShow = await Show.findByPk(showId);
        const targetUser = await User.findByPk(userId);
        targetUser.addShow(targetShow);
        const response = await User.findOne({
            where: { id: userId },
            include: Show
        });
        res.json(response);
    } catch(error) {
        next(error);
    }
})

module.exports = usersRouter;