// @flow
import * as React from 'react'
import classNames from 'classnames'
import {
  actionInitState,
  actionInitProps,
  receiveUpdateState,
  actionReturnResult,
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

import './../style.css'

type Props = {
  type: string,                   // 可為 autocomplete 或 dropdown
  disabled: boolean,              // 是否 disabled
  clickReset: boolean,            // 每次click 時,是否自動reset velue
  className: ?string,             // 最外層預設.rj_autocompleteContent, 額外自訂className
  emptyText: string,              // 查無結果時字串
  placeholder: string,            // 自定義placeholder
  filterKey: string,              // 搜尋依照哪個key值
  searchAddon: any,               // 前置 icon (autocomplete) 或 後置icon (dropdown)
  autoFocus: boolean,             // 是否autoFocus
  setValue: boolean,              // 選定值後是否帶入input
  keys: ?string,                  // 回傳依照obj下哪個key 值, 若為null 則預設直接回傳object 本身key值
  data: any,                      // 主要資料來源,支援Object 或 Array
  propsUpdate: number,            // 外部更新內部使用的 Date.now()
  onChange: string | number,      // 選定之後的callback
}

type State = {
  listVisible: boolean,           // 是否顯示列表
  keyword: string,                // 當下input value
  result: any,                    // indexof 後的結果
  keyboardSelect: number | null,  // 目前選項在第幾個
}

class AutoComplete extends React.Component<Props, State> {
  static defaultProps = actionInitProps();
  constructor(props: Props) {
    super(props)
    this.state = actionInitState()
  }

  /** init resultData */
  componentWillMount() {
    this.searchResult()
  }

  /** 如果propsUpdate 更新  */
  componentWillReceiveProps(nextProps: Props) {
    if (this.props.propsUpdate !== nextProps.propsUpdate) {
      const newState = receiveUpdateState(nextProps)
      this.setState(newState)
    }
  }

  /** 外部除非更新propsUpdate,不然不影響內部 */
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const stateUpdate = this.state !== nextState
    const propsUpdate = this.props.propsUpdate !== nextProps.propsUpdate
    return stateUpdate || propsUpdate
  }

  /** 點擊input 顯示下拉項目 */
  toggleVisible = () => {
    if (!this.state.listVisible && !this.props.disabled) {
      const newState = actionToggleVisible(this.props, this.state)
      this.setState(newState, () => {
        this.resultList.scrollTop = 0
      })
    }
  }

  /** 輸入關鍵字時的onChange */
  handleChange = (nextState: State) => {
    const newState = actionHandleChange(this.state, nextState)
    this.setState(newState,
      this.searchResult)
  }

  /** 關鍵字搜尋結果 */
  searchResult = () => {
    const newState = actionSearchResult(this.props, this.state)
    this.setState(newState)
  }

  /** 滑鼠hover 時 */
  setIndex = (index: number) => {
    const newState = actionSetIndex(index)
    this.setState(newState)
  }

  /** 鍵盤控制區塊 */
  indexSelected = (e) => {
    if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
      return false
    }
    e.preventDefault()

    /** 按下enter */
    if (e.keyCode === 13) {
      return actionOnPressEnter(this.state) && this.setValue(actionOnPressEnter(this.state))
    }

    /** 上下鍵計算index 區塊 */
    const indexObj = actionGetNextIndex(this.state, e.keyCode)
    const { nextIndex, nowIndex } = indexObj

    /** 是否需要滾動 */
    const needScroll = actionNeedScroll(this.resultList, this.resultContent)
    if (needScroll) {
      const scrollPx = actionGetScrollTop(this.resultItem, nowIndex)
      this.resultList.scrollTop = scrollPx
    }
    
    this.setState({
      keyboardSelect: nextIndex,
    })
  }

  /** 選定選項後行為 */
  setValue = (value: string) => {
    const newState = actionSetValue(this.props, this.state, value)
    const outPutValue = actionOutPutValue(this.props, this.state, value)
    this.setState(newState, () => {
      this.searchResult()
      this.props.onChange(outPutValue)
    })
  }
  render() {
    const {
      type,
      disabled,
      className,
      filterKey,
      placeholder,
      emptyText,
      autoFocus,
      searchAddon
    } = this.props
    const { result } = this.state
    return (
      <div className={classNames('rj_autocompleteContent', { [className]: !Object.is(className, undefined) })}>
        <div className={classNames("icon_addon fw-900", { hidden: type === 'dropdown' })}>
          {searchAddon}
        </div>
        <input
          onClick={this.toggleVisible}
          autoFocus={autoFocus}
          type="text"
          value={this.state.keyword}
          readOnly={type === 'dropdown'}
          disabled={disabled}
          onChange={e => this.handleChange({ keyword: e.target.value, listVisible: true })}
          onKeyDown={this.indexSelected}
          className="rj_autocomplete"
          placeholder={placeholder} />
        <div className={classNames("icon_addon fw-900 mr-10", { hidden: type !== 'dropdown' })}>{searchAddon}</div>
        <hr />
        <hr className="focus-border" />
        <div
          className={classNames('overlayCancel', { hidden: !this.state.listVisible })}
          onClick={() => this.handleChange({ listVisible: false })}></div>
        <div
          ref={el => { this.resultList = el }}
          className={classNames('rj_list', { rj_list_hidden: !this.state.listVisible })}>
          <ul ref={el => { this.resultContent = el }}>
            {Object.keys(result).length
              ? Object.keys(result).map((lv2Key, i) =>
                <li key={`auto_${lv2Key}`}
                  ref={el => { this.resultItem = el }}
                  className={classNames('result', { active: this.state.keyboardSelect === i })}
                  onClick={() => this.setValue(lv2Key)}
                  onMouseOver={() => this.setIndex(i)}
                >
                  {result[lv2Key][filterKey]}
                </li>)
              : <li>{emptyText}</li>}
          </ul>
        </div>
      </div>
    )
  }
}

export default AutoComplete
