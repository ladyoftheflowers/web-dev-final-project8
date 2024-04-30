const mongoose = require("mongoose")

const TopicSchema = new mongoose.Schema(
    {
        topic:{
            type:String, 
            required:true,
            unique:true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);