const axios = require('axios')
const fs = require('fs')
const path = require('path')
const localListData = require('../cache')
const localDateString = new Date().toLocaleDateString()

module.exports = async () => {
  if (localListData[localDateString]) {
    return localListData[localDateString]
  }

  const datas = await axios.get('https://api.github.com/users/keywaFE/repos?access_token=f5011e41e7a43c03d8de01f686d2e572d64e6f7a')

  const list = datas.data.filter(item => item.name
    .includes('template'))
    .map(item => item.name)

  const cacheString = `
module.exports = {
  '${localDateString}': ${JSON.stringify(list)}
}`
  fs.writeFileSync(path.join(__dirname, '../cache.js'), cacheString, { encoding: 'utf8', flag: 'w' })

  return list
}