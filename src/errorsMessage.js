const errors = {
    require: {
        participants: 'Participants are required',
        atLeastTwo: 'At least two or more participants are required',
        message: 'Message is required',
        chatId: 'ChatId is required',
        allFields: 'All fields are required'
    },
    
    notFound: 'Chat not found',
    notUpdated: 'Chat not updated',
    notDeleted: 'Chat not deleted',
    notFoundUser: 'User not found',
    notCreated: 'Chat not created',
    conectToDB: 'SequelizeConnectionRefusedError',
    ServerError: 'Server error',
    usernameExists: 'Username is already in use',
    usernameNotExists: 'Username not found',
    wrongPassword: 'Wrong password'
}

module.exports = errors;