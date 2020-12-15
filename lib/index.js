// https://github.com/cjj281795819/chuhc-react/blob/master/packages/%40chuhc/cli/lib/create.js

//github.com/yokiyokiyoki/ds-cli/blob/develop/src/lib/init/cli-init.ts

// api 获取list https://github.com/yokiyokiyoki/ds-cli/blob/develop/src/lib/list/cli-list.ts

https: 'use strict'
const program = require('commander')
const packageInfo = require('../package.json')

// 版本
program.usage('<command>').version(packageInfo.version)

program
  .command('init')
  .description('初始化项目')
  .alias('i')
  .action(() => {
    require('./cmd/init')()
  })

program
  .command('list')
  .description('查看模板列表')
  .alias('l')
  .action(() => {
    require('./cmd/list')()
  })

program.parse(process.argv)
// 如果没有输出命令，那输入执行器会有提示帮助说明
if (!program.args.length) {
  program.help()
}
