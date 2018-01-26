'use strict'
// 處理component 本身有 import css or scss, 將style mock 掉
module.exports = {
  process() {
    return 'module.exports = {};'
  },
  getCacheKey() {
    return 'cssTransform'
  },
}