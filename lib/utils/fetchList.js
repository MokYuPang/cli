const axios = require('axios')
const fs = require('fs')
const path = require('path')
const localListData = require('../cache')
const localDateString = new Date().toLocaleDateString()

module.exports = async () => {
  if (localListData[localDateString]) {
    return localListData[localDateString]
  }

  const datas = await axios.get('https://api.github.com/users/keywaFE/repos?access_token=7aba4dfd9addf64af2b1e15c233586f8c794da8e')

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