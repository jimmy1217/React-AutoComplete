'use strict'
// 處理js/jsx/css/scss/json以外的檔案
const path = require('path')
module.exports = {
  process(src, filename) {
    return `module.exports =
    ${JSON.stringify(path.basename(filename))};`
  },
}