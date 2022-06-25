const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
        require: true
    },

    tasks: [ {type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
    
}, { timestamps: true})

module.exports = mongoose.model('Category', CategorySchema);
