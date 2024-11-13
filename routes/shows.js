const express = require("express");
const showsRouter = express.Router();
const { User, Show } = require("../models"); 

showsRouter.get("/", async (req, res, next) => {
    try {
        const allShows = await Show.findAll();
        res.status(200).json(allShows);
    } catch(error) {
        next(error);
    }
})

showsRouter.get("/:id", async (req, res, next) => {
    try {
        const targetShow = await Show.findByPk(req.params.id);
        res.status(200).json(targetShow);
    } catch(error) {
        next(error);
    }
})

showsRouter.get("/:id/users", async (req, res, next) => {
    try {
        const targetShow = await Show.findOne({
            where: { id: req.params.id },
            include: User
        })
        res.status(200).json(targetShow);
    } catch(error) {
        next(error);
    }
})

showsRouter.put("/:id/available", async (req, res, next) => {
    try {
        const targetShow = await Show.findByPk(req.params.id);
        const targetAvailability = targetShow.available;
        await Show.update({
            available: !targetAvailability
        }, { where: { id: req.params.id } });
        const updatedShow = await Show.findByPk(req.params.id);
        res.status(200).json(updatedShow);
    } catch {
        next(error);
    }
})

module.exports = showsRouter;