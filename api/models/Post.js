const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        desc: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        topics: {
            type: Array,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);