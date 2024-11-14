const express = require("express");
const showsRouter = express.Router();
const { User, Show } = require("../models"); 
const { check, validationResult } = require("express-validator");

showsRouter.get("/", async (req, res, next) => {
    try {
        const allShows = await Show.findAll();
        res.status(200).json(allShows);
    } catch(error) {
        next(error);
    }
})

showsRouter.get("/:id([0-9]+)", async (req, res, next) => {
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

showsRouter.get("/:genre([a-zA-Z]+)", async (req, res, next) => {
    try {
        const genreShows = await Show.findAll({ where: { genre: `${req.params.genre.charAt(0).toUpperCase() + req.params.genre.slice(1)}` } });
        res.status(200).json(genreShows);
    } catch(error) {
        next(error);
    }
})


showsRouter.post("/", [
    check("title").isLength({ max: 25 }).withMessage("title must be 25 characters or less")
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(422).json({error: errors.array()});
    } else {
        const newShow = await Show.create(req.body);
        res.status(200).json({created: newShow});
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

showsRouter.delete("/:id", async (req, res, next) => {
    try {
        const targetShow = await Show.findByPk(req.params.id);
        await Show.destroy({ where: { id: req.params.id } })
        res.status(200).json({deleted: targetShow});
    } catch(error) {
        next(error);
    }
})

module.exports = showsRouter;