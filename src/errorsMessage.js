const errors = {
    require: {
        participants: 'Participants are required',
        atLeastTwo: 'At least two or more participants are required',
        message: 'Message is required',
        chatId: 'ChatId is required',
        allFields: 'All fields are required'
    },
    
    notFound: 'Chat not found',
    notCreated: 'Chat not created',
    conectToDB: 'SequelizeConnectionRefusedError',
    ServerError: 'Server error',
    usernameExists: 'Username is already in use',
}

module.exports = errors;