"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Observer = _interopRequireDefault(require("./Observer"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var init = function init() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var observer = new _Observer.default();

  var Context = _react.default.createContext();

  var _state = initialState;

  var Provider =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Provider, _React$Component);

    function Provider() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Provider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Provider)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", initialState);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateState", function (updator, callback) {
        if ((0, _util.isFunction)(updator)) {
          _this.setState(updator, function () {
            return _this.afterUpdateState(callback);
          });
        } else if ((0, _util.isObject)(updator)) {
          _this.setState(updator, function () {
            return _this.afterUpdateState(callback);
          });
        } else {
          console.error('cannot setState if updator is not Object or Function');
          return callback(_this.state);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "afterUpdateState", function (callback) {
        _state = _this.state;
        return callback(_this.state);
      });

      return _this;
    }

    _createClass(Provider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        observer.on('_update', this.updateState);
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _util.deepEqual)(nextState, this.state);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        observer.off('_update', this.updateState);
        _state = null;
      }
    }, {
      key: "render",
      value: function render() {
        var children = this.props.children;
        return _react.default.createElement(Context.Provider, {
          value: this.state
        }, children);
      }
    }]);

    return Provider;
  }(_react.default.Component);

  var PureComponent =
  /*#__PURE__*/
  function (_React$Component2) {
    _inherits(PureComponent, _React$Component2);

    function PureComponent() {
      _classCallCheck(this, PureComponent);

      return _possibleConstructorReturn(this, _getPrototypeOf(PureComponent).apply(this, arguments));
    }

    _createClass(PureComponent, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        return !(0, _util.deepEqual)(nextProps.data, this.props.data);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            children = _this$props.children,
            data = _this$props.data;
        return children(data);
      }
    }]);

    return PureComponent;
  }(_react.default.Component);

  var PureConsumer =
  /*#__PURE__*/
  function (_React$Component3) {
    _inherits(PureConsumer, _React$Component3);

    function PureConsumer() {
      _classCallCheck(this, PureConsumer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PureConsumer).apply(this, arguments));
    }

    _createClass(PureConsumer, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            picker = _this$props2.picker,
            children = _this$props2.children;
        return _react.default.createElement(Context.Consumer, null, function (value) {
          return _react.default.createElement(PureComponent, {
            data: picker(value),
            children: children
          });
        });
      }
    }]);

    return PureConsumer;
  }(_react.default.Component);

  _defineProperty(PureConsumer, "defaultProps", {
    picker: function picker(v) {
      return v;
    },
    children: function children() {
      return null;
    }
  });

  return {
    Provider: Provider,
    Consumer: Context.Consumer,
    update: function update(updator) {
      return new Promise(function (resolve, reject) {
        observer.emit('_update', updator, function (state) {
          return state ? resolve(state) : reject(state);
        });
      });
    },
    reset: function reset() {
      return new Promise(function (resolve) {
        observer.emit('_update', function () {
          return initialState;
        }, function (state) {
          return resolve(state);
        });
      });
    },
    get: function get(picker) {
      if ((0, _util.isString)(picker)) {
        return (0, _util.copy)(_state[picker]);
      } else if ((0, _util.isFunction)(picker)) {
        return (0, _util.copy)(picker(_state));
      } else {
        return (0, _util.copy)(_state);
      }
    },
    PureConsumer: PureConsumer
  };
};

var _default = init;
exports.default = _default;