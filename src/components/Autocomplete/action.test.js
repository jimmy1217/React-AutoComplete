import {
  actionInitState,
  actionInitProps,
  receiveUpdateState,
  actionSearchResult,
  actionOnPressEnter,
  actionGetNextIndex,
  actionNeedScroll,
  actionGetScrollTop,
  actionSetIndex,
  actionSetValue,
  actionOutPutValue,
  actionHandleChange,
  actionToggleVisible
} from './action'

test('初始化 state - actionInitState', () => {
  const initState = actionInitState()
  expect(initState).toEqual({
    listVisible: false,
    keyword: '',
    result: {},
    keyboardSelect: null,
  })
})

test('改變props 資料狀態 - receiveUpdateState', () => {
  const nextProps = {
    data: [{ 'test1': 'items' }, { 'test2': 'items2' }]
  }
  const initState = actionInitState()
  const thisState = { ...initState, keyword: 'apple', listVisible: true }
  const nextState = receiveUpdateState(nextProps)
  expect({ ...thisState, ...nextState }).toEqual({
    listVisible: true,
    keyword: '',
    result: [{ 'test1': 'items' }, { 'test2': 'items2' }],
    keyboardSelect: null,
  })
})

describe('搜尋結果測試', () => {
  const initState = actionInitState()
  const initProps = actionInitProps()
  test('多筆比對到 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: 'a' }
    const thisProps = {
      ...initProps, data: [
        { name: 'apple', fruit: '蘋果' },
        { name: 'banana', fruit: '香蕉' }
      ]
    }
    const newState = actionSearchResult(thisProps, thisState)
    expect(newState).toEqual({
      "keyboardSelect": 0,
      "result": {
        "0": { "name": "apple", "fruit": "蘋果" },
        "1": { "name": "banana", "fruit": "香蕉" }
      }
    })
  })
  test('單筆比對到 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: 'bana' }
    const thisProps = {
      ...initProps, data: [
        { name: 'apple', fruit: '蘋果' },
        { name: 'banana', fruit: '香蕉' }
      ]
    }
    const newState = actionSearchResult(thisProps, thisState)
    expect(newState).toEqual({
      "keyboardSelect": 0,
      "result": {
        "1": { "name": "banana", "fruit": "香蕉" }
      }
    })
  })
  test('查無資料 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: 'dhwaiuhduiw' }
    const thisProps = {
      ...initProps, data: [
        { name: 'apple', fruit: '蘋果' },
        { name: 'banana', fruit: '香蕉' }
      ]
    }
    const newState = actionSearchResult(thisProps, thisState)
    expect(newState).toEqual({
      "keyboardSelect": null,
      "result": {}
    })
  })
})

