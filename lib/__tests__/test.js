"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _chai = require("chai");

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  count: 1,
  show: true
};
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact.default()
});
describe('test for bz-react-ctx', function () {
  it('basic', function () {
    var _init = (0, _index.default)(initialState),
        Provider = _init.Provider,
        Consumer = _init.Consumer,
        PureConsumer = _init.PureConsumer,
        update = _init.update,
        get = _init.get;

    var TestComponent = function TestComponent() {
      return _react.default.createElement(Provider, null, _react.default.createElement(Consumer, null, function (value) {
        return _react.default.createElement("div", {
          id: "test"
        }, value.count);
      }));
    };

    var wrapper = (0, _enzyme.mount)(_react.default.createElement(TestComponent, null));
    var node = wrapper.find('#test');
    (0, _chai.expect)(node.getDOMNode().textContent).equal('1');
  });
  it('update with Provider mount', function () {
    var _init2 = (0, _index.default)(initialState),
        Provider = _init2.Provider,
        Consumer = _init2.Consumer,
        PureConsumer = _init2.PureConsumer,
        update = _init2.update,
        get = _init2.get;

    var TestComponent = function TestComponent() {
      return _react.default.createElement(Provider, null, _react.default.createElement(Consumer, null, function (value) {
        return _react.default.createElement("div", {
          id: "test"
        }, value.count);
      }));
    };

    var wrapper = (0, _enzyme.mount)(_react.default.createElement(TestComponent, null));
    var node = wrapper.find('#test');
    update(function (s) {
      return {
        count: s.count + 1
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('2');
    update({
      count: 10
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('10');
    var state = get();
    var count1 = get(function (s) {
      return s.count;
    });
    (0, _chai.expect)(state.count).equal(10);
    (0, _chai.expect)(count1).equal(10);
    update({
      count: state.count + 10
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('20');
    var count2 = get("count");
    (0, _chai.expect)(count2).equal(20);
    update(null);
    (0, _chai.expect)(node.getDOMNode().textContent).equal('20');
  });
  it('reset', function () {
    var _init3 = (0, _index.default)(initialState),
        Provider = _init3.Provider,
        Consumer = _init3.Consumer,
        reset = _init3.reset,
        update = _init3.update,
        get = _init3.get;

    var TestComponent = function TestComponent() {
      return _react.default.createElement(Provider, null, _react.default.createElement(Consumer, null, function (value) {
        return _react.default.createElement("div", {
          id: "test"
        }, value.count);
      }));
    };

    var wrapper = (0, _enzyme.mount)(_react.default.createElement(TestComponent, null));
    var node = wrapper.find('#test');
    update(function (s) {
      return {
        count: s.count + 10
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('11');
    reset();
    (0, _chai.expect)(node.getDOMNode().textContent).equal('1');
  });
  it('update with Provide unmount', function () {
    var _init4 = (0, _index.default)(initialState),
        Provider = _init4.Provider,
        Consumer = _init4.Consumer,
        PureConsumer = _init4.PureConsumer,
        update = _init4.update,
        get = _init4.get;

    var TestComponent = function TestComponent() {
      return _react.default.createElement(Provider, null, _react.default.createElement(Consumer, null, function (value) {
        return _react.default.createElement("div", {
          id: "test"
        }, value.count);
      }));
    };

    var wrapper = (0, _enzyme.mount)(_react.default.createElement(TestComponent, null));
    var node = wrapper.find('#test');
    update(function (s) {
      return {
        count: s.count + 10
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('11');
    wrapper.unmount(); // after unmount observer will not work and result of get() will be null

    update(function (s) {
      return {
        count: 0
      };
    });
    (0, _chai.expect)(get()).equal(null);
  });
  it('Consumer will not render if no update', function () {
    var _init5 = (0, _index.default)(initialState),
        Provider = _init5.Provider,
        Consumer = _init5.Consumer,
        PureConsumer = _init5.PureConsumer,
        update = _init5.update,
        get = _init5.get;

    var renderCount = 0;

    var TestComponent = function TestComponent() {
      return _react.default.createElement(Provider, null, _react.default.createElement(Consumer, null, function (value) {
        renderCount = renderCount + 1;
        return _react.default.createElement("div", {
          id: "test"
        }, value.count);
      }));
    };

    var wrapper = (0, _enzyme.mount)(_react.default.createElement(TestComponent, null));
    var node = wrapper.find('#test');
    update(function (s) {
      return {
        count: 1
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('1');
    (0, _chai.expect)(renderCount).equal(1);
    update(function (s) {
      return {
        count: 10
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('10');
    (0, _chai.expect)(renderCount).equal(2);
  });
  it('PureConsumer will not render if no update', function () {
    var _init6 = (0, _index.default)(initialState),
        Provider = _init6.Provider,
        Consumer = _init6.Consumer,
        PureConsumer = _init6.PureConsumer,
        update = _init6.update,
        get = _init6.get;

    var renderCount = 0;

    var TestComponent = function TestComponent() {
      return _react.default.createElement(Provider, null, _react.default.createElement(PureConsumer, null, function (data) {
        renderCount = renderCount + 1;
        return _react.default.createElement("div", {
          id: "test"
        }, data.count);
      }), "}");
    };

    var wrapper = (0, _enzyme.mount)(_react.default.createElement(TestComponent, null));
    var node = wrapper.find('#test');
    update(function (s) {
      return {
        count: 1
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('1');
    (0, _chai.expect)(renderCount).equal(1);
    update(function (s) {
      return {
        count: 10
      };
    });
    (0, _chai.expect)(node.getDOMNode().textContent).equal('10');
    (0, _chai.expect)(renderCount).equal(2);
  });
});