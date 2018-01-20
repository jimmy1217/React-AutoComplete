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
  const initProps = actionInitProps()
  const nextProps = {
    ...initProps,
    data: [
      { name: 'apple', fruit: '蘋果' },
      { name: 'banana', fruit: '香蕉' }
    ]
  }
  const initState = actionInitState()
  const thisState = { ...initState, keyword: '32132' }
  const nextState = receiveUpdateState(nextProps)
  expect({ ...thisState, ...nextState }).toEqual({
    listVisible: false,
    keyword: '',
    result: {
      "0": { "name": "apple", "fruit": "蘋果" },
      "1": { "name": "banana", "fruit": "香蕉" }
    },
    keyboardSelect: null,
  })
})

describe('搜尋結果測試', () => {
  const initState = actionInitState()
  const initProps = actionInitProps()
  test('下拉選單模式 - 有項目 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: '' }
    const thisProps = {
      ...initProps, data: [
        { name: 'apple', fruit: '蘋果' },
        { name: 'banana', fruit: '香蕉' }
      ],
      type: 'dropdown'
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
  test('下拉選單模式 - 無項目 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: '' }
    const thisProps = {
      ...initProps, data: [],
      type: 'dropdown'
    }
    const newState = actionSearchResult(thisProps, thisState)
    expect(newState).toEqual({
      "keyboardSelect": null,
      "result": {}
    })
  })
  test('無關鍵字 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: '' }
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
  test('多筆結果 - actionSearchResult', () => {
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
  test('測大小寫 - actionSearchResult', () => {
    const thisState = { ...initState, keyword: ' BA' }
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
  test('單筆結果 - actionSearchResult', () => {
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

describe('鍵盤控制', () => {
  const initState = actionInitState()
  describe('Enter 控制', () => {
    test('按下Enter- 有結果狀態 - actionOnPressEnter', () => {
      const thisState = {
        ...initState, "keyboardSelect": 1,
        "result": {
          "0": { "name": "apple", "fruit": "蘋果" },
          "1": { "name": "banana", "fruit": "香蕉" }
        }
      }
      expect(actionOnPressEnter(thisState)).toBe("1")
    })
    test('按下Enter- 無結果狀態 - actionOnPressEnter', () => {
      const thisState = {
        ...initState, "keyboardSelect": null,
        "result": {
          "0": { "name": "apple", "fruit": "蘋果" },
          "1": { "name": "banana", "fruit": "香蕉" }
        }
      }
      expect(actionOnPressEnter(thisState)).toBe(false)
    })
  })

  describe('上下鍵 控制', () => {
    const initState = actionInitState()
    const thisState = {
      ...initState,
      "result": {
        "0": { "name": "apple", "fruit": "蘋果" },
        "1": { "name": "banana", "fruit": "香蕉" }
      },
      "keyboardSelect": 1
    }
    test('按上index遞減 - actionGetNextIndex', () => {
      const indexObj = actionGetNextIndex(thisState, 38)
      const { nextIndex } = indexObj
      expect(nextIndex).toBe(0)
    })
    test('按下index遞減 - actionGetNextIndex', () => {
      const nowState = { ...thisState, "keyboardSelect": 0 }
      const indexObj = actionGetNextIndex(thisState, 40)
      const { nextIndex } = indexObj
      expect(nextIndex).toBe(1)
    })
    test('按上index置頂 - actionGetNextIndex', () => {
      const nowState = { ...thisState, "keyboardSelect": 0 }
      const indexObj = actionGetNextIndex(nowState, 38)
      const { nextIndex } = indexObj
      expect(nextIndex).toBe(0)
    })
    test('按下index至底 - actionGetNextIndex', () => {
      const indexObj = actionGetNextIndex(thisState, 40)
      const { nextIndex } = indexObj
      expect(nextIndex).toBe(1)
    })
    test('有結果時目前index - actionGetNextIndex', () => {
      const indexObj = actionGetNextIndex(thisState, 40)
      const { nowIndex } = indexObj
      expect(nowIndex).toBe(1)
    })
    test('首次查詢有結果時目前index - actionGetNextIndex', () => {
      const nowState = { ...thisState, "keyboardSelect": null }
      const indexObj = actionGetNextIndex(nowState, 40)
      const { nowIndex } = indexObj
      expect(nowIndex).toBe(0)
    })
    test('首次查詢無結果時目前index - actionGetNextIndex', () => {
      const nowState = { ...thisState, result: {}, "keyboardSelect": null }
      const indexObj = actionGetNextIndex(nowState, 40)
      const { nowIndex } = indexObj
      expect(nowIndex).toBe(-1)
    })
  })
})

describe('滑鼠控制', () => {
  test('滑鼠hover Index - actionSetIndex', () => {
    const initState = actionInitState();
    const newIndex = actionSetIndex(2);
    const thisState = { ...initState, ...newIndex, keyword: '222' }
    expect(thisState).toEqual({
      listVisible: false,
      keyword: '222',
      result: {},
      keyboardSelect: 2,
    })
  })
})

describe('Output Value 測試',()=>{
  

})