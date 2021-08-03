const Log = require('./Log');
const { LOG_MODULE, LOG_ACCOUNT } = require('./constants');

const newLog = (db, module = null, accountId = null) => {
  const log = new Log(db, module || LOG_MODULE);

  log.acc(accountId || LOG_ACCOUNT);

  return log.hide(['_id', 'module', '_ctx']);
};

module.exports = {
  newLog,
};
