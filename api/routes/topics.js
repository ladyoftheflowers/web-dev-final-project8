const router = require("express").Router();
const Topic = require("../models/Topic");
const User = require("../models/User");


//NEW
router.post("/", async (req, res) => {
    const caller = await User.findOne({ username: req.body.username });

    if (caller != undefined && caller.admin) {
        const newTop = await new Topic(req.body);
        try {
            const savedTop = await newTop.save();
            res.status(200).json(savedTop);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("Only admins can add topics!");
    }
});


//GET 
router.get("/", async (req, res) => {
    try {
        const tops = await Topic.find();
        res.status(200).json(tops);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    const caller = await User.findOne({ username: req.body.username });

    if (caller != undefined && caller.admin) {
        try {
            const topic = await Topic.findById(req.params.id);
            try {
                await Topic.deleteOne(topic);
                res.status(200).json("Deleted.")
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } catch (err) {
            res.status(404).json("Topic not found");
        }
    } else {
        res.status(401).json("Only admins can delete topics!");
    }
});


module.exports = router;