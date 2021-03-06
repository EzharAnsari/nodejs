const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category"}

}, { timestamps: true})

module.exports = mongoose.model('Task', TaskSchema);