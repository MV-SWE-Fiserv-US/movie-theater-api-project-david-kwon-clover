const express = require("express");
const usersRouter = express.Router();
const { User, Show } = require("../models");

usersRouter.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch(error) {
        next(error);
    }
})

usersRouter.get("/:id", async (req, res, next) => {
    try {
        const targetUser = await User.findByPk(req.params.id);
        res.status(200).json(targetUser);
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
        res.status(200).json(targetUser);
    } catch(error) {
        next(error)
    }
})

usersRouter.put("/:userId/shows/:showId", async (req, res, next) => {
    const { userId, showId } = req.params;
    try {
        const targetShow = await Show.findByPk(showId);
        const targetUser = await User.findByPk(userId);
        await targetUser.addShow(targetShow);
        const updatedUser = await User.findByPk(userId, { include: Show });
        res.status(200).json(updatedUser);
    } catch(error) {
        next(error);
    }
})

usersRouter.delete("/:id", async (req, res, next) => {
    try {
        const targetUser = await User.findByPk(req.params.id);
        await User.destroy({ where: { id: req.params.id } });
        res.status(200).json({deleted: targetUser});
    } catch(error) {
        next(error);
    }

})

module.exports = usersRouter;