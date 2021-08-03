const Log =   require('./Log')

const newLog = (module, accountId = null, action = null) => {
  const log = new Log(module);

    if (action) {
    log.fields({ action })
  }

  if (accountId) {
    log.acc(accountId);
  }

  return log.hide(['_id', 'module', '_ctx']);
}

module.exports = {
  newLog
}