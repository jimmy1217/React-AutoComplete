import React, { Component } from 'react';
import './style';

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.setValue = this.setValue.bind(this);
    this.state = {
      listVisible: false,
      keyword: "",
      result: {},
      keyboardSelect: null
    }
  }
  componentWillMount() {
    this.searchResult()
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      setTimeout(() => {
        this.input.focus();
      }, 300);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      this.setState({
        result: nextProps.data
      });
    }
  }
  /**
   * 點擊input 顯示下拉項目
   */
  toggleVisible = () => {
    if (!this.state.listVisible) {
      this.setState({
        listVisible: !this.state.listVisible
      });
    }
  }
  /**
   * 輸入關鍵字時的onChange
   */
  handleChange = (newState) => {
    this.setState({
      ...this.state,
      ...newState
    }, this.searchResult);
  }

  /**
   *  關鍵字搜尋結果
   */
  searchResult = () => {
    //使用state 下 keyword 與 props.data 做比對
    const { data, filterKey } = this.props;
    let active = null; // 鍵盤輸入的預設key
    let result = this.state.keyword.trim().length
      ? Object.keys(data).reduce((resultObj, key) => {
        if (data[key][filterKey].toUpperCase().indexOf(this.state.keyword.trim().toUpperCase()) > -1) {
          resultObj[key] = data[key]
          active = 0;
        }
        return resultObj
      }, {})
      : this.props.data
    this.setState({
      result: result,
      keyboardSelect: active
    });
  }
  /**
   *  滑鼠hover 時
   */
  setIndex = (index) => (e) => {
    this.setState({
      keyboardSelect: index
    });
  }
  /**
   *  鍵盤控制區塊
   */
  indexSelected = (e) => {
    if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
      return false
    }
    e.preventDefault();
    const { keys } = this.props;
    const { result, keyboardSelect } = this.state;
    /**
     *  按下 Enter 邏輯
     */
    if (e.keyCode === 13 && keyboardSelect !== null && keyboardSelect > -1 && Object.keys(result).length) {
      const lv2Key = Object.keys(result)[keyboardSelect];
      this.setValue(lv2Key);
    } else {
      /**
       * 上下鍵計算index 區塊
       */
      const maxIndex = Object.keys(result).length - 1;
      let nowIndex = keyboardSelect !== null ? Number(keyboardSelect) : -1;
      const nextIndex = e.keyCode === 40
        ? nowIndex < maxIndex ? nowIndex += 1 : maxIndex
        : nowIndex > 0 ? nowIndex -= 1 : 0;

      /**
       * 處理上下鍵連動scroll 區塊
       */
      const resultListPx = this.resultList.clientHeight;
      // 如果有查詢結果
      if (!!resultListPx) {
        const resultListStyle = this.resultList.currentStyle || window.getComputedStyle(this.resultList);
        const paddingHeight = parseFloat(resultListStyle.paddingTop) + parseFloat(resultListStyle.paddingBottom);
        const resultViewHeight = resultListPx - paddingHeight;
        // 實際內容 Height
        const resultContentPx = this.resultContent.clientHeight;
        // 是否需要 scroll
        const needScroll = !!(resultContentPx > resultViewHeight);
        if (needScroll) {
          // 每個 li Height
          const scrollPx = this.resultItem.clientHeight;
          this.resultList.scrollTop = scrollPx * nowIndex;
        }
      }

      this.setState({
        keyboardSelect: nextIndex
      });
    }
  }
  /**
   * 選定選項後行為
   */
  setValue(value) {
    // 當按下選項發生什麼事, 是否要寫入keyword
    const { data, setValue, filterKey, keys } = this.props;
    const { result } = this.state;
    const outPutValue = !!keys ? result[value][keys] : value;
    this.setState({
      keyword: setValue ? data[value][filterKey] : "",
      listVisible: false
    }, () => {
      this.searchResult();
      this.props.onChange(outPutValue);
    });
  }
  render() {
    const { className, filterKey, placeholder, emptyText } = this.props;
    const { result } = this.state;
    return (
      <div className={classNames("rj_autocompleteContent", { [className]: typeof className != 'undefined' })}>
        <div className="fl_center fw-900">
          <span>&#9906;</span>
        </div>
        <input
          onClick={this.toggleVisible}
          ref={el => { this.input = el }}
          autofocus="autofocus"
          type="text"
          value={this.state.keyword}
          onChange={e => this.handleChange({ keyword: e.target.value, listVisible: !!e.target.value.length })}
          onKeyDown={this.indexSelected}
          className="rj_autocomplete"
          placeholder={placeholder} />
        <hr/>
        <hr className="focus-border" />
        <div
          className={classNames("overlayCancel", { hidden: !this.state.listVisible })}
          onClick={() => {
            this.setState({
              listVisible: false
            })
          }}></div>
        <div ref={el => { this.resultList = el }} className={classNames("rj_list", { rj_list_hidden: !this.state.listVisible })}>
          <ul ref={el => { this.resultContent = el }}>
            {Object.keys(result).length
              ? Object.keys(result).map((lv2Key, i) =>
                <li key={`auto_${lv2Key}`}
                  ref={el => { this.resultItem = el }}
                  className={classNames("result", { active: this.state.keyboardSelect === i })}
                  onClick={() => this.setValue(lv2Key)}
                  onMouseOver={this.setIndex(i)}
                >
                  {result[lv2Key][filterKey]}
                </li>)
              : <li>{emptyText}</li>}
          </ul>
        </div>
      </div>
    );
  }
}

AutoComplete.defaultProps = {
  emptyText: "查無結果",
  placeholder: "請搜尋想找的項目",
  filterKey: "name", // 搜尋依照哪個key值
  autoFocus: false,
  setValue: true,
  keys: null, // 回傳依照obj下哪個key 值, 若為null 則直接回傳object key
  data: {
    test1: { name: "apple", fruit: "蘋果" },
    test2: { name: "banana", fruit: "香蕉" },
    test3: { name: "orange", fruit: "橘子" },
    test4: { name: "tomato", fruit: "番茄" },
    test5: { name: "strawberry", fruit: "草莓" },
    test6: { name: "wax apple", fruit: "蓮霧" },
    test7: { name: "blueberry", fruit: "藍莓" },
    test7: { name: "mango", fruit: "芒果" },
  },
  onChange: (value) => { console.log(`callback value is ${value}`) }
}

export default AutoComplete;
