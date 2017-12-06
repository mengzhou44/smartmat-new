const mongoose = require('mongoose');

module.exports.Client = mongoose.model('Client', {
    name: {
        type: String,
        required: true,
        minilength: 1,
        trim: true
    }
});
