export function actionSearchResult(props, state) {
  /**
    * 使用state 下 keyword 與 props.data 做比對
    */
  const { data, filterKey, type } = props
  let active = null // 鍵盤輸入的預設key
  const result = state.keyword.trim().length && type === 'autocomplete'
    ? Object.keys(data).reduce((resultObj, key) => {
      if (data[key][filterKey].toUpperCase().indexOf(state.keyword.trim().toUpperCase()) > -1) {
        resultObj[key] = data[key]
        active = 0
      }
      return resultObj
    }, {})
    : props.data

  return {
    result: result,
    keyboardSelect: active,
  }
}

export function actionSetIndex(index) {
  return {
    keyboardSelect: index,
  }
}

export function actionSetValue(props, state, value) {
  // 當按下選項發生什麼事, 是否要寫入keyword
  const {
    data,
    setValue,
    filterKey,
    keys,
  } = props

  const { result } = state
  const outPutValue = !!keys ? result[value][keys] : value

  return {
    keyword: setValue ? data[value][filterKey] : '',
    listVisible: false,
  }
}