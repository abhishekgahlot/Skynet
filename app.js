const RtmClient = require('@slack/client').RtmClient;
const token = require('./secret_key.js').key;
const getMember = require('./helpers').getMember;
const engine = require('./engine').engine;

/* Global logging */
function log(...args) {
  console.log.apply(console, args);
}

// var rtm = new RtmClient(token, {logLevel: 'debug'});
const rtm = new RtmClient(token);
rtm.start();

const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
  // const user = rtm.dataStore.getUserById(message.user);
  // const dm = rtm.dataStore.getDMByName(user.name);
  if (message.subtype === 'bot_message') {
    return false;
  }

  log(JSON.stringify(message));
  // log(getMember(message.user));
  // rtm.sendMessage('Hey!', dm.id);
  const replies = engine.salutation(message.text, message.user);
  if (replies) {
    setTimeout(() => {
      rtm.sendMessage(replies, message.channel);
    }, 2000);
  }
});
