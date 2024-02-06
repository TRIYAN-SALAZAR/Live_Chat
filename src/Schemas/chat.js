const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    isRoom: {
        type: Boolean,
        default: false
    },
    participants: {
        type: [Object],
        default: [Object]
    },
    refMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
});

module.exports = model('Chat', chatSchema);