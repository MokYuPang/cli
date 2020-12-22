const axios = require('axios')
const fs = require('fs')
const path = require('path')
const localListData = require('../cache')
const localDateString = new Date().toLocaleDateString()

module.exports = async () => {
  if (localListData[localDateString]) {
    return localListData[localDateString]
  }

  const datas = await axios.get('https://api.github.com/users/keywaFE/repos?access_token=1724e3d52f45a171a1a87816f881b4683f65eb9a')

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