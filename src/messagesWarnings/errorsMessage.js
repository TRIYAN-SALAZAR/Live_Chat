const errors = {
  require: {
    participants: "Participants are required",
    atLeastTwo: "At least two or more participants are required",
    message: "Message is required",
    chatId: "ChatId is required",
    allFields: "All fields are required",
  },

  notFound: "Chat not found",
  notUpdated: "Chat not updated",
  notDeleted: "Chat not deleted",
  notFoundUser: "User not found",
  notCreated: "Chat not created",

  conectToDB: "SequelizeConnectionRefusedError",
  ServerError: "Internal Server Error",
  usernameExists: "Username is already in use",
  usernameNotExists: "Username not found",
  wrongPassword: "Wrong password",

  notUpdatedMessage: "Message not updated",
  notDeletedMessage: "Message not deleted",

  alreadyExists: "Chat already exists",
  notAuthenticated: "Unauthorized please sign in or Log In",
  cannotReadID: `Cannot read properties of undefined (reading 'id')`,
  jwt: {
    invalidToken: "Invalid token",
    expired: "Token Expired",
    notFound: "Token not found"
  }
};

module.exports = errors;
