const router = require("express").Router();
const Post = require("../models/Post");



//CREATE
router.post("/", async (req, res) => {
    const newPost = await new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//EDIT
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can edit only your own posts!");
        }
    } catch (err) {
        res.status(500).json(err);
    }

});

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await Post.deleteOne(post);
                res.status(200).json("Deleted.")
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can edit only your own posts!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});


//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POST
router.get("/", async (req, res) => {
    const username = req.query.user;
    const topName = req.query.top;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (topName) {
            posts = await Post.find({
                topics: {
                    $in: [topName],
                },
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;