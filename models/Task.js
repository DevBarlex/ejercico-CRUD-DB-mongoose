const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    body: String
}, { timestamps: true });

const taskModel = mongoose.model("Post", PostSchema);

module.exports = taskModel;




