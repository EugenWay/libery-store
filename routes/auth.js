const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

router.get("/", (req, res) => {
    res.send("This is auth");
});

router.post(
    "/register",
    [
        check("email", "Invalid e-mail").isEmail(),
        check(
            "password",
            "Password length should be 6 characters long."
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect registaration data",
                });
            }

            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);

            const condidate = await User.findOne({ email });

            if (condidate) {
                return res.status(400).json({ message: "User already exists" });
            }

            const user = new User({
                email,
                password: hashedPassword,
            });

            await user.save();
            res.status(201).json({ message: "User has been created" });
        } catch (err) {
            console.log("Something went wrong");
            console.log(err);
            res.status(500);
        }
    }
);

// Login API using express-validator in midleware

router.post(
    "/login",
    [
        check("email", "Invalid e-mail").normalizeEmail().isEmail(),
        check("password", "Please introduce your password").exists(),
    ],
    async (req, res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect login data",
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: "User does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "Password is wrong. Try again" });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                { expiresIn: "1h" }
            );

            res.json({
                token,
                userId: user.id,
                message: "Wellcome",
            });
        } catch (err) {
            console.log("Something went wrong");
            console.log(err);
            res.status(500);
        }
    }
);

module.exports = router;
