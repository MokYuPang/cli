const ora = require('ora')
const loading = ora()
const download = require('download-git-repo')
const shell = require('shelljs')

const fetchList = require('../utils/fetchList')

const inquirer = require('inquirer')
const init = async () => {
  const list = await fetchList()
  inquirer
    .prompt([
      {
        name: 'template',
        message: '请选择项目模板',
        type: 'list',
        choices: list,
      },
      {
        name: 'author',
        message: '请输入作者名称',
      },
      {
        name: 'project',
        message: '请输入项目名称',
      },
      {
        name: 'description',
        message: '请输入项目描述',
      },
    ])
    .then((answers) => {
      loading.start(`cloning ${answers.template} into ${answers.project}`)

      download(
        `direct:https://github.com/keywaFE/${answers.template}.git#main`,
        `./${answers.project}`,
        { clone: true },
        (err) => {
          console.log()
          loading.succeed('clone template successful!')

          console.log()
          console.log(`$ cd ${answers.project}`)
          console.log(`$ npm install`)
          console.log('$ npm run dev')
          console.log()

          // shell.cd(`./${answers.project}`)
          // loading.start('installing')

          // shell.exec('npm install', () => {
          //   loading.succeed('🎉 Successfully created project!')

          //   console.log()
          //   console.log('$ npm run dev')
          //   console.log()
          // })
        }
      )
    })
}
module.exports = init

// const shell = require('shelljs')

// shell.exec(`
//   mocha -r ts-node/register test/${params}.spec.ts --colors
// `, { async: true })
