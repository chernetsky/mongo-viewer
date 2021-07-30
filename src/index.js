

const log = (...args) => {
  if (print != undefined) {
    print(...args);
  } else if (  console != undefined) {
    
    
      console.log(...args);
  }
};


const all =   newLog()
const ws = newLog("WS_CONNECT");
const hand = newLog('HANDLER');
const fcm = newLog('FCM_SEND');
fcm.hide('args')

function acc(accountId) {
  all.acc(accountId);
  ws.acc(accountId);
  hand.acc(accountId);
  fcm.acc(accountId);
}

function dev(isDev) {
  all.dev(isDev);
  ws.dev(isDev);
  hand.dev(isDev);
  fcm.dev(isDev);
}

function mine() {
  acc(41288907);
  dev(1);
}
function front() {
  acc(74456215);
  dev(1);
}

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

ws.dev(true).limit(10).field('_ctx.accountId', 4344).find();

-- Все параметры сохраняются
ws.find();

*/

