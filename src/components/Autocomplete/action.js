/** return init state */
export function actionInitState() {
  return ({
    listVisible: false,
    keyword: '',
    result: {},
    keyboardSelect: null,
  })
}

/** propsUpdate return State */
export function receiveUpdateState(props) {
  return {
    keyword: '',
    result: props.data,
  }
}

/** 按下enter 邏輯 */
export function actionOnPressEnter(state) {
  const { result, keyboardSelect } = state
  if (keyboardSelect !== null && keyboardSelect > -1 && Object.keys(result).length) {
    const lv2Key = Object.keys(result)[keyboardSelect]
    return lv2Key
  } else {
    return false
  }
}

/** 取得目標項目index */
export function actionGetNextIndex(state, keyCode) {
  const { result, keyboardSelect } = state
  const maxIndex = Object.keys(result).length - 1
  let nowIndex = keyboardSelect !== null ? Number(keyboardSelect) : -1
  const nextIndex = keyCode === 40
    ? nowIndex < maxIndex
      ? nowIndex += 1
      : maxIndex
    : nowIndex > 0
      ? nowIndex -= 1
      : 0
  return {
    nextIndex,
    nowIndex
  }
}

/** Dom - 是否需要滾動 */
export function actionNeedScroll(resultList, resultContent) {
  const resultListPx: number = resultList.clientHeight
  // 如果有查詢結果
  if (!!resultListPx) {
    const resultListStyle =
      resultList.currentStyle || window.getComputedStyle(resultList)
    const paddingHeight =
      parseFloat(resultListStyle.paddingTop) + parseFloat(resultListStyle.paddingBottom)
    const resultViewHeight = resultListPx - paddingHeight
    // 實際內容 Height
    const resultContentPx = resultContent.clientHeight
    // 是否需要 scroll
    return !!(resultContentPx > resultViewHeight)
  } else {
    return false
  }
}

/** Dom - 計算scrolltop */
export function actionGetScrollTop(resultItem, nowIndex) {
  const scrollPx = resultItem.clientHeight  * nowIndex
  return scrollPx
}

/** 關鍵字搜尋結果 */
export function actionSearchResult(props, state) {
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
    : data
  return {
    result: result,
    keyboardSelect: active,
  }
}

/** 滑鼠hover 時 */
export function actionSetIndex(index) {
  return {
    keyboardSelect: index,
  }
}

/** 選定選項後行為 */
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

/** 輸入關鍵字時的onChange */
export function actionHandleChange(state, nextState) {
  return {
    ...state,
    ...nextState,
  }
}

/** onChange輸出的值 */
export function actionOutPutValue(props, state, value) {
  const { keys } = props
  const { result } = state
  const outPutValue = !!keys ? result[value][keys] : value
  return outPutValue
}

/** 點擊input 顯示下拉項目 */
export function actionToggleVisible(props, state) {
  const defaultClickSetting = props.clickReset ? {
    keyword: "",
    result: props.data,
  } : {}

  return {
    ...defaultClickSetting,
    listVisible: !state.listVisible
  }
}
