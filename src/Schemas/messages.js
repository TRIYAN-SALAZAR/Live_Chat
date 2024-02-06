const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    messages: {
        type: [Object],
        default: [Object]
    }
});

module.exports = model('Message', messageSchema);