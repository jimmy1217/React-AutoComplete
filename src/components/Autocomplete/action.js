/** return init state */
export function actionInitState(){
  return ({
    listVisible: false,
    keyword: '',
    result: {},
    keyboardSelect: null,
  })
}

/** propsUpdate return State */
export function receiveUpdateState(props){
  return {
    keyword: '',
    result: props.data,
  }
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
