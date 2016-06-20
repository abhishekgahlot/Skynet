const allowedChannels = require('./config.js').allowedChannels;

const engine = {
  salutation: (message, userid) => {
    // check for here message.
    if (engine.forHere(message) || allowedChannels.indexOf(userid) === -1) {
      return false;
    }

    const lowerMessage = message.toLowerCase();
    const salutationStack = ['hi', 'hello', 'howdy', 'abe', 'oye', 'yo', 'hey', 'ping', 'there?'];
    for (let i = 0; i < salutationStack.length; i++) {
      if (lowerMessage.substring(0, 9).indexOf(salutationStack[i]) > -1) {
        return salutationStack[i];
      }
    }
    return false;
  },

  forHere: (message) => {
    // never reply for here in channel.
    if (message.indexOf('<!here|@here>') > -1) {
      return true;
    }
    return false;
  },
};

module.exports = {
  engine,
};
