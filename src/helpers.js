const Log =   require('./Log')

const newLog = (action = null, accountId = null) => {
  const log = new Log('events-sender');

    if (action) {
    log.fields({ action })
  }

  if (accountId) {
    log.acc(accountId);
  }

  return log.hide(['_id', 'module', '_ctx']);
}

module.expo