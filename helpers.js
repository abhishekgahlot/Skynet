const members = require('./members');

const getMember = function getMember(id) {
  try {
    return members.filter((key) => {
      return key.id === id;
    }).shift();
  } catch (e) {
    return false;
  }
};


module.exports = {
  getMember,
  members,
};
