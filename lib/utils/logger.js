const chalk = require('chalk')
const format = require('util').format

const logSymbols = require('log-symbols')

const prefix = 'kw-cli'
const sep = chalk.gray('······')

function log(...args) {
  const msg = format.apply(format, args)
  console.log(logSymbols.info, chalk.white(prefix), sep, msg)
}

function fatal(...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  console.error(logSymbols.error, chalk.red(prefix), sep, msg)
  // 退出当前进程
  process.exit(1)
}

function success(...args) {
  const msg = format.apply(format, args)
  console.log(logSymbols.success, chalk.green(prefix), sep, msg)
}

const logger = {
  log,
  fatal,
  success,
}

module.exports = logger
