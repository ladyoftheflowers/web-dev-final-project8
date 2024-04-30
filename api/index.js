const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const topicRoute = require("./routes/topics");
const multer = require("multer")


dotenv.config();
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL, {

    })
    .then(console.log("connected to mdb"))
    .catch((err) => console.log(err));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Uploaded.");
})

app.use(express.static('public'))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/topics", topicRoute);

app.listen("5000", () => {
    console.log("backend is running.");
});