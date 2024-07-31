const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Task = require('../models/task');
const authenticateToken = require('../middleware/authenticate');
const mongoose = require('mongoose');

// Get all tasks
router.get("/", authenticateToken, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
});

// Get specific task
router.get("/:task", authenticateToken, async (req, res) => {
    try {
        const taskTitle = req.params.task;
        const userId = req.body.userId;
        const task = await Task.findOne({ title: new RegExp('^' + taskTitle + '$', 'i'), userId });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Error fetching task", error: err.message });
    }
});

// Create new task
router.post("/", authenticateToken, async (req, res) => {
    try {
        console.log("user id: ", req.body.userId);
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            time_created: req.body.time_created,
            complete_time: req.body.complete_time,
            priority: req.body.priority,
            userId: req.body.userId,
        });

        console.log("task: ", task);

        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: "Error creating task", error: err.message });
    }
});

// Update task
router.put("/:task", authenticateToken, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const taskTitle = req.params.task;
        const userId = req.body.userId;
        const task = await Task.findOne({ title: new RegExp('^' + taskTitle + '$', 'i'), userId });
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.status = req.body.status || task.status;
        task.time_created = req.body.time_created || task.time_created;
        task.complete_time = req.body.complete_time || task.complete_time;
        task.priority = req.body.priority || task.priority;

        const updatedTask = await task.save();
        res.json(updatedTask);

    } catch (error) {
        res.status(400).json({ message: "Error updating task", error: error.message });
    }
});

// Delete task
router.delete("/:task", authenticateToken, async (req, res) => {
    try {
        const taskTitle = req.params.task;
        const userId = req.body.userId;
        const task = await Task.findOne({ title: new RegExp('^' + taskTitle + '$', 'i'), userId });
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.deleteOne();
        res.status(204).send(); 

    } catch (err) {
        res.status(500).json({ message: "Error deleting task", error: err.message });
    }
});

module.exports = router;
