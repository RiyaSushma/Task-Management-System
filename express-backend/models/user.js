const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is mandatory'],
        unique: true,
        select: true,
    },
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email is invalid'],
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory'],
        select: [true],
    },
});

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch(err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('user', UserSchema);