const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    permanentAddress: {
        type: String,
        default: ''
    },
    presentAddress: {
        type: String,
        default: ''
    },
    number:{
        type: Number,
        default: ''
    },
    balance:{
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png'
    },
});

module.exports = mongoose.model('user', userSchema);
