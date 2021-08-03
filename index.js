/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { newLog } = require('./src/helpers');

// Log 1
const l1 = newLog(db.logs);

/*
Использование объекта логирования

-- Создание

const ws = new Log('events-sender');
ws.fields({
  action: 'WS_CONNECT',
}).hide(['_id', 'module', '_ctx']);

-- Поиск с изменением параметров поиска
ws.find({
  '_ctx.accountId': 4344,
  messageText: 'Blah-blah',
});

ws.offset(1).acc(333333).find(123321);

ws.limit(10).field('_ctx.accountId', 4344).find();

-- Все параметры сохраняются
ws.find();

*/
