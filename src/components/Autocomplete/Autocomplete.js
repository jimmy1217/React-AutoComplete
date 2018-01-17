// @flow
import * as React from 'react'
import classNames from 'classnames'
import './../style.css'

type Props = {
  type: string,             // 可為 autocomplete 或 dropdown
  disabled: boolean,        // 是否 disabled
  clickReset: boolean,      // 每次click 時,是否自動reset velue
  className: ?string,       // 最外層預設.rj_autocompleteContent, 額外自訂className
  emptyText: string,        // 查無結果時字串
  placeholder: string,      // 自定義placeholder
  filterKey: string,        // 搜尋依照哪個key值
  searchAddon: any,         // 前置 icon (autocomplete) 或 後置icon (dropdown)
  autoFocus: boolean,       // 是否autoFocus
  setValue: boolean,        // 選定值後是否帶入input
  keys: ?string,            // 回傳依照obj下哪個key 值, 若為null 則預設直接回傳object 本身key值
  data: any,                // 主要資料來源,支援Object 或 Array
  onChange: string | number,// 選定之後的callback
}

type State = {
  listVisible: boolean,
  keyword: string,
  result: any,
  keyboardSelect: number | null,
}

class AutoComplete extends React.Component<Props, State> {
  static defaultProps = {
    type: 'autocomplete',
    disabled: false,
    clickReset: false,
    emptyText: '查無結果',
    placeholder: '請搜尋想找的項目',
    filterKey: 'name',
    searchAddon: <span className="defaultSearch">&#9906;</span>,
    autoFocus: false,
    setValue: true,
    keys: null,
    data: [
      { name: 'apple', fruit: '蘋果' }, 
      { name: 'banana', fruit: '香蕉' }
    ],
    onChange: (value: string | number) => {
      console.log(`callback value is ${value}`)
    },
  };
  constructor(props: Props) {
    super(props)
    this.setValue = this.setValue.bind(this)
    this.state = {
      listVisible: false,
      keyword: '',
      result: {},
      keyboardSelect: null,
    }
  }
  componentWillMount() {
    this.searchResult()
  }
  componentWillReceiveProps(nextProps: Props) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState({
        result: nextProps.data,
      })
    }
  }
  /**
   * 點擊input 顯示下拉項目
   */
  toggleVisible = () => {
    if (!this.state.listVisible && !this.props.disabled) {
      const defaultClickSetting = this.props.clickReset ? {
        keyword: "",
        result: this.props.data,
      } : {}
      
      this.setState({
        ...defaultClickSetting,
        listVisible: !this.state.listVisible
      }, () => {
        this.resultList.scrollTop = 0;
      })
    }
  }

  /**
   * 輸入關鍵字時的onChange
   */
  handleChange = (newState: State) => {
    this.setState({
      ...this.state,
      ...newState,
    }, this.searchResult)
  }

  /**
   *  關鍵字搜尋結果
   */
  searchResult = () => {
    /**
     * 使用state 下 keyword 與 props.data 做比對
     */
    const { data, filterKey, type } = this.props
    let active = null // 鍵盤輸入的預設key
    const result = this.state.keyword.trim().length && type === 'autocomplete'
      ? Object.keys(data).reduce((resultObj, key) => {
        if (data[key][filterKey].toUpperCase().indexOf(this.state.keyword.trim().toUpperCase()) > -1) {
          resultObj[key] = data[key]
          active = 0
        }
        return resultObj
      }, {})
      : this.props.data
    this.setState({
      result: result,
      keyboardSelect: active,
    })
  }

  /**
   *  滑鼠hover 時
   */
  setIndex = index => (e) => {
    this.setState({
      keyboardSelect: index,
    })
  }

  /**
   *  鍵盤控制區塊
   */
  indexSelected = (e) => {
    if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
      return false
    }
    e.preventDefault()
    const { result, keyboardSelect } = this.state
    /**
     *  按下 Enter 邏輯
     */
    if (e.keyCode === 13 && keyboardSelect !== null &&
      keyboardSelect > -1 && Object.keys(result).length) {
      const lv2Key = Object.keys(result)[keyboardSelect]
      this.setValue(lv2Key)
    } else {
      /**
       * 上下鍵計算index 區塊
       */
      const maxIndex = Object.keys(result).length - 1
      let nowIndex = keyboardSelect !== null ? Number(keyboardSelect) : -1
      const nextIndex = e.keyCode === 40
        ? nowIndex < maxIndex
          ? nowIndex += 1
          : maxIndex
        : nowIndex > 0
          ? nowIndex -= 1
          : 0

      /**
       * 處理上下鍵連動scroll 區塊
       */
      const resultListPx: number = this.resultList.clientHeight
      // 如果有查詢結果
      if (!!resultListPx) {
        const resultListStyle =
          this.resultList.currentStyle || window.getComputedStyle(this.resultList)
        const paddingHeight =
          parseFloat(resultListStyle.paddingTop) + parseFloat(resultListStyle.paddingBottom)
        const resultViewHeight = resultListPx - paddingHeight
        // 實際內容 Height
        const resultContentPx = this.resultContent.clientHeight
        // 是否需要 scroll
        const needScroll = !!(resultContentPx > resultViewHeight)
        if (needScroll) {
          // 每個 li Height
          const scrollPx = this.resultItem.clientHeight
          this.resultList.scrollTop = scrollPx * nowIndex
        }
      }

      this.setState({
        keyboardSelect: nextIndex,
      })
    }
  }

  /**
   * 選定選項後行為
   */
  setValue(value) {
    // 當按下選項發生什麼事, 是否要寫入keyword
    const {
      data,
      setValue,
      filterKey,
      keys,
    } = this.props

    const { result } = this.state
    const outPutValue = !!keys ? result[value][keys] : value
    this.setState({
      keyword: setValue ? data[value][filterKey] : '',
      listVisible: false,
    }, () => {
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
      <div className={classNames('rj_autocompleteContent', { [className]: typeof className !== 'undefined' })}>
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
          onChange={e => this.handleChange({ keyword: e.target.value })}
          onKeyDown={this.indexSelected}
          className="rj_autocomplete"
          placeholder={placeholder} />
        <div className={classNames("icon_addon fw-900 mr-10", { hidden: type !== 'dropdown' })}>{searchAddon}</div>
        <hr />
        <hr className="focus-border" />
        <div
          className={classNames('overlayCancel', { hidden: !this.state.listVisible })}
          onClick={() => {
            this.setState({
              listVisible: false,
            })
          }}></div>
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
                  onMouseOver={this.setIndex(i)}
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
