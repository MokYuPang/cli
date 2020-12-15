const ora = require('ora')
const loading = ora()
const chalk = require('chalk')
const getList = require('../utils/fetchList')

async function list () {
  loading.start('正在获取模板列表')

  const list = await getList()
  console.log()
  loading.succeed('共有下列模板')

  list.forEach((item, index) => {
    console.log()
    console.log(chalk.green(`${index + 1}) ${item}`))
  })

  console.log()
}
module.exports = list
