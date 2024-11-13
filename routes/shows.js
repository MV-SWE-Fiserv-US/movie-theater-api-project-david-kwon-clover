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

module.exports = showsRouter;