const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    messages: {
        type: [Object],
        default: [Object]
    }
});

module.exports = model('Message', messageSchema);