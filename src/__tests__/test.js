import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import init from '../index';

const initialState = { count: 1, show: true };

configure({ adapter: new Adapter() });

describe('test for bz-react-ctx', () => {
  it('basic', () => {
    const { Provider, Consumer, PureConsumer, update, get } = init(initialState);
    const TestComponent = () => <Provider>
      <Consumer>
        {value => <div id='test'>{value.count}</div>}
      </Consumer>
    </Provider>;
    const wrapper = mount(<TestComponent />);
    const node = wrapper.find('#test');
    expect(node.getDOMNode().textContent).equal('1');
  });

  it('update with Provider mount', () => {
    const { Provider, Consumer, PureConsumer, update, get } = init(initialState);
    const TestComponent = () => <Provider>
      <Consumer>
        {value => <div id='test'>{value.count}</div>}
      </Consumer>
    </Provider>;
    const wrapper = mount(<TestComponent />);
    const node = wrapper.find('#test');
    update(s => ({ count: s.count + 1 }));
    expect(node.getDOMNode().textContent).equal('2');
    update({ count: 10 });
    expect(node.getDOMNode().textContent).equal('10');
    let state = get();
    let count1 = get(s => s.count);
    expect(state.count).equal(10);
    expect(count1).equal(10);
    update({ count: state.count + 10 });
    expect(node.getDOMNode().textContent).equal('20');
    let count2 = get("count");
    expect(count2).equal(20);
    update(null);
    expect(node.getDOMNode().textContent).equal('20');
  });

  it('update with Provide unmount', () => {
    const { Provider, Consumer, PureConsumer, update, get } = init(initialState);
    const TestComponent = () => <Provider>
      <Consumer>
        {value => <div id='test'>{value.count}</div>}
      </Consumer>
    </Provider>;
    const wrapper = mount(<TestComponent />);
    const node = wrapper.find('#test');
    update(s => ({ count: s.count + 10 }));
    expect(node.getDOMNode().textContent).equal('11');

    wrapper.unmount();
    // after unmount observer will not work and result of get() will be null
    update(s => ({ count: 0 }));
    expect(get()).equal(null);
  });

  it('Consumer will not render if no update', () => {
    const { Provider, Consumer, PureConsumer, update, get } = init(initialState);
    let renderCount = 0;
    const TestComponent = () => <Provider>
      <Consumer>
        {value => {
          renderCount = renderCount + 1;
          return <div id='test'>{value.count}</div>
        }}
      </Consumer>
    </Provider>;
    const wrapper = mount(<TestComponent />);
    const node = wrapper.find('#test');
    update(s => ({ count: 1 }));
    expect(node.getDOMNode().textContent).equal('1');
    expect(renderCount).equal(1);
    update(s => ({ count: 10 }));
    expect(node.getDOMNode().textContent).equal('10');
    expect(renderCount).equal(2);
  });

  it('PureConsumer will not render if no update', () => {
    const { Provider, Consumer, PureConsumer, update, get } = init(initialState);
    let renderCount = 0;
    const TestComponent = () => <Provider>
      <Consumer>
        {value => <PureConsumer data={value}>
          {data => {
            renderCount = renderCount + 1;
            return <div id='test'>{data.count}</div>
          }}
        </PureConsumer>}
      </Consumer>
    </Provider>;
    const wrapper = mount(<TestComponent />);
    const node = wrapper.find('#test');
    update(s => ({ count: 1 }));
    expect(node.getDOMNode().textContent).equal('1');
    expect(renderCount).equal(1);
    update(s => ({ count: 10 }));
    expect(node.getDOMNode().textContent).equal('10');
    expect(renderCount).equal(2);
  });
});
