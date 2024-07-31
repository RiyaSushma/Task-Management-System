const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator');
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const jwt_secret = "ThisisJwtSecretCodeforfoodorderingsite";

router.post("/createuser", [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }

        const user = new User({ name, email, password });
        await user.save();
        res.json({ success: true, authToken: "" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



router.post("/loginuser", [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password'); // Include password field
        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'Email not found' }] });
        }

        const isMatch = await user.comparePassword(password);
        if (isMatch) {
            const payload = { user: { id: user._id } };
            const authToken = jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
            return res.json({ success: true, authToken });
        } else {
            return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;