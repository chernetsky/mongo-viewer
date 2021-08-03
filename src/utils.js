/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const log = (...args) => {
  if (global.print != undefined) {
    global.print(...args);
  } else if (console != undefined) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

module.exports = {
  log,
};
