const mongoose = require('mongoose');

module.exports.Tag = mongoose.model('Client', {
    name: {
        type: String,
        required: true,
        minilength: 1,
        trim: true
    }
});
