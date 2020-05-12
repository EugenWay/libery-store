const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator");

const Product = require("../models/Product");

router.get("/", (req, res) => {
    res.send("This is product API page");
});

router.post("/", async (req, res) => {
    const { title, description, genre, price, image } = req.body;

    const product = new Product({
        title,
        description,
        genre,
        price,
        image,
    });

    await product.save();
    res.status(201).json({ message: `${title} has been created` });
});

module.exports = router;
