const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    isRoom: {
        type: Boolean,
        default: false
    },
    participants: {
        type: [Object],
        require: true
    },
    refMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        require: true
    }
});

module.exports = model('Chat', chatSchema);