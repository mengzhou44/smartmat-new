const mongoose = require('mongoose');

module.exports.Tag = mongoose.model('Tag', {
    uuid: {
        type: String,
        required: true,
        minilength: 1,
        trim: true
    },
    matId: {
        type: String,
        required: true,
        minilength: 1,
        trim: true
    }
});
