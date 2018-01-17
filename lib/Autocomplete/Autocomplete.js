'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./../style.css');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AutoComplete = function (_React$Component) {
  (0, _inherits3.default)(AutoComplete, _React$Component);

  function AutoComplete(props) {
    (0, _classCallCheck3.default)(this, AutoComplete);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AutoComplete.__proto__ || (0, _getPrototypeOf2.default)(AutoComplete)).call(this, props));

    _this.toggleVisible = function () {
      if (!_this.state.listVisible && !_this.props.disabled) {
        var defaultClickSetting = _this.props.clickReset ? {
          keyword: "",
          result: _this.props.data
        } : {};

        _this.setState((0, _extends3.default)({}, defaultClickSetting, {
          listVisible: !_this.state.listVisible
        }), function () {
          _this.resultList.scrollTop = 0;
        });
      }
    };

    _this.handleChange = function (newState) {
      _this.setState((0, _extends3.default)({}, _this.state, newState), _this.searchResult);
    };

    _this.searchResult = function () {
      /**
       * 使用state 下 keyword 與 props.data 做比對
       */
      var _this$props = _this.props,
          data = _this$props.data,
          filterKey = _this$props.filterKey,
          type = _this$props.type;

      var active = null; // 鍵盤輸入的預設key
      var result = _this.state.keyword.trim().length && type === 'autocomplete' ? (0, _keys2.default)(data).reduce(function (resultObj, key) {
        if (data[key][filterKey].toUpperCase().indexOf(_this.state.keyword.trim().toUpperCase()) > -1) {
          resultObj[key] = data[key];
          active = 0;
        }
        return resultObj;
      }, {}) : _this.props.data;
      _this.setState({
        result: result,
        keyboardSelect: active
      });
    };

    _this.setIndex = function (index) {
      return function (e) {
        _this.setState({
          keyboardSelect: index
        });
      };
    };

    _this.indexSelected = function (e) {
      if (e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
        return false;
      }
      e.preventDefault();
      var _this$state = _this.state,
          result = _this$state.result,
          keyboardSelect = _this$state.keyboardSelect;
      /**
       *  按下 Enter 邏輯
       */

      if (e.keyCode === 13 && keyboardSelect !== null && keyboardSelect > -1 && (0, _keys2.default)(result).length) {
        var lv2Key = (0, _keys2.default)(result)[keyboardSelect];
        _this.setValue(lv2Key);
      } else {
        /**
         * 上下鍵計算index 區塊
         */
        var maxIndex = (0, _keys2.default)(result).length - 1;
        var nowIndex = keyboardSelect !== null ? Number(keyboardSelect) : -1;
        var nextIndex = e.keyCode === 40 ? nowIndex < maxIndex ? nowIndex += 1 : maxIndex : nowIndex > 0 ? nowIndex -= 1 : 0;

        /**
         * 處理上下鍵連動scroll 區塊
         */
        var resultListPx = _this.resultList.clientHeight;
        // 如果有查詢結果
        if (!!resultListPx) {
          var resultListStyle = _this.resultList.currentStyle || window.getComputedStyle(_this.resultList);
          var paddingHeight = parseFloat(resultListStyle.paddingTop) + parseFloat(resultListStyle.paddingBottom);
          var resultViewHeight = resultListPx - paddingHeight;
          // 實際內容 Height
          var resultContentPx = _this.resultContent.clientHeight;
          // 是否需要 scroll
          var needScroll = !!(resultContentPx > resultViewHeight);
          if (needScroll) {
            // 每個 li Height
            var scrollPx = _this.resultItem.clientHeight;
            _this.resultList.scrollTop = scrollPx * nowIndex;
          }
        }

        _this.setState({
          keyboardSelect: nextIndex
        });
      }
    };

    _this.setValue = _this.setValue.bind(_this);
    _this.state = {
      listVisible: false,
      keyword: '',
      result: {},
      keyboardSelect: null
    };
    return _this;
  }

  (0, _createClass3.default)(AutoComplete, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.searchResult();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if ((0, _stringify2.default)(this.props.data) !== (0, _stringify2.default)(nextProps.data)) {
        this.setState({
          result: nextProps.data
        });
      }
    }
    /**
     * 點擊input 顯示下拉項目
     */


    /**
     * 輸入關鍵字時的onChange
     */


    /**
     *  關鍵字搜尋結果
     */


    /**
     *  滑鼠hover 時
     */


    /**
     *  鍵盤控制區塊
     */

  }, {
    key: 'setValue',


    /**
     * 選定選項後行為
     */
    value: function setValue(value) {
      var _this2 = this;

      // 當按下選項發生什麼事, 是否要寫入keyword
      var _props = this.props,
          data = _props.data,
          setValue = _props.setValue,
          filterKey = _props.filterKey,
          keys = _props.keys;
      var result = this.state.result;

      var outPutValue = !!keys ? result[value][keys] : value;
      this.setState({
        keyword: setValue ? data[value][filterKey] : '',
        listVisible: false
      }, function () {
        _this2.searchResult();
        _this2.props.onChange(outPutValue);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          type = _props2.type,
          disabled = _props2.disabled,
          className = _props2.className,
          filterKey = _props2.filterKey,
          placeholder = _props2.placeholder,
          emptyText = _props2.emptyText,
          autoFocus = _props2.autoFocus,
          searchAddon = _props2.searchAddon;
      var result = this.state.result;

      return React.createElement(
        'div',
        { className: (0, _classnames2.default)('rj_autocompleteContent', (0, _defineProperty3.default)({}, className, typeof className !== 'undefined')) },
        React.createElement(
          'div',
          { className: (0, _classnames2.default)("icon_addon fw-900", { hidden: type === 'dropdown' }) },
          searchAddon
        ),
        React.createElement('input', {
          onClick: this.toggleVisible,
          autoFocus: autoFocus,
          type: 'text',
          value: this.state.keyword,
          readOnly: type === 'dropdown',
          disabled: disabled,
          onChange: function onChange(e) {
            return _this3.handleChange({ keyword: e.target.value });
          },
          onKeyDown: this.indexSelected,
          className: 'rj_autocomplete',
          placeholder: placeholder }),
        React.createElement(
          'div',
          { className: (0, _classnames2.default)("icon_addon fw-900 mr-10", { hidden: type !== 'dropdown' }) },
          searchAddon
        ),
        React.createElement('hr', null),
        React.createElement('hr', { className: 'focus-border' }),
        React.createElement('div', {
          className: (0, _classnames2.default)('overlayCancel', { hidden: !this.state.listVisible }),
          onClick: function onClick() {
            _this3.setState({
              listVisible: false
            });
          } }),
        React.createElement(
          'div',
          {
            ref: function ref(el) {
              _this3.resultList = el;
            },
            className: (0, _classnames2.default)('rj_list', { rj_list_hidden: !this.state.listVisible }) },
          React.createElement(
            'ul',
            { ref: function ref(el) {
                _this3.resultContent = el;
              } },
            (0, _keys2.default)(result).length ? (0, _keys2.default)(result).map(function (lv2Key, i) {
              return React.createElement(
                'li',
                { key: 'auto_' + lv2Key,
                  ref: function ref(el) {
                    _this3.resultItem = el;
                  },
                  className: (0, _classnames2.default)('result', { active: _this3.state.keyboardSelect === i }),
                  onClick: function onClick() {
                    return _this3.setValue(lv2Key);
                  },
                  onMouseOver: _this3.setIndex(i)
                },
                result[lv2Key][filterKey]
              );
            }) : React.createElement(
              'li',
              null,
              emptyText
            )
          )
        )
      );
    }
  }]);
  return AutoComplete;
}(React.Component);

AutoComplete.defaultProps = {
  type: 'autocomplete',
  disabled: false,
  clickReset: false,
  emptyText: '查無結果',
  placeholder: '請搜尋想找的項目',
  filterKey: 'name',
  searchAddon: React.createElement(
    'span',
    { className: 'defaultSearch' },
    '\u26B2'
  ),
  autoFocus: false,
  setValue: true,
  keys: null,
  data: [{ name: 'apple', fruit: '蘋果' }, { name: 'banana', fruit: '香蕉' }],
  onChange: function onChange(value) {
    console.log('callback value is ' + value);
  }
};
exports.default = AutoComplete;