const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.files);
    console.log(req.files.file);
    if (req.files === null) {
        return res.status(400).json({ message: "No file uploded" });
    }

    const file = req.files.file;

    file.mv(`./client/public/uploads/${file.name}`, (err) => {
        if (err) {
            console.log(err);
            return res.status(500);
        }

        res.json({
            fileName: file.name,
            filePath: `/uploads/${file.name}`,
            message: "File uploaded",
        });
    });
});

module.exports = router;
