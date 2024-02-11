const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    userID: {
        type: String,
        require: true
    },
    chats: {
        type: [Schema.Types.ObjectId],
        ref: 'Chat',
        require: true,
        default: [Schema.Types.ObjectId]
    }
});

module.exports = model('User', userSchema)