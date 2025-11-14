/* eslint-disable no-console */
// Logger util: em desenvolvimento usa console; em produção é no-op
const isDev = process.env.NODE_ENV !== 'production';

function noop() {}

export const logger = {
  log: isDev ? console.log.bind(console) : noop,
  info: isDev ? console.info.bind(console) : noop,
  warn: isDev ? console.warn.bind(console) : noop,
  error: isDev ? console.error.bind(console) : noop,
};
