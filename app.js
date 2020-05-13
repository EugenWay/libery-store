const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const config = require("config");

const PORT = config.get("port") || 5000;

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const uploadRouter = require("./routes/upload");

const app = express();

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/upload", uploadRouter);

const startServer = async () => {
    try {
        // Connect to DB

        await mongoose.connect(
            "mongodb+srv://library:1234@cluster0-lbquw.mongodb.net/app?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            () => console.log("Connected to DB")
        );

        app.listen(PORT, () =>
            console.log(`🚀 Server ready at http://localhost:${PORT}`)
        );
    } catch (err) {
        console.log(`Error: ${err.message} `);
        process.exit(1);
    }
};

startServer();
