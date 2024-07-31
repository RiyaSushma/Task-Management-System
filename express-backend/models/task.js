const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending",
    },
    priority: {
        type: String,
        enum: ["urgent", "medium", "low"],
        default: "low"
    },
    time_created : {
        type: Date,
        value: Date.now
    },
    complete_time: {
        type: Date,
        default: () => new Date(Date.now() + 60*60*1000)
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});


module.exports = mongoose.model("Task", TaskSchema);