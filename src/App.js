import React, { Component } from 'react';
import init from './Controller/index';

const Fragment = React.Fragment;
const CountStore = init({count: 0});
const ShowStore = init({show: true});

const addCount = () => CountStore.update(s => ({count: s.count + 1}));
const minusCount = () => CountStore.update(s => ({count: s.count - 1}));
const toggleShow = () => ShowStore.update(s => ({show: !s.show}));

class App extends Component {
  componentDidMount() {
    CountStore.update({
      count: 10
    });
  }

  render() {
    return (
      <Fragment>
        <CountStore.Provider>
          <ShowStore.Provider>
            <ShowStore.PureConsumer picker={value => value.show}>
              {show => show && <CountStore.Consumer>
                {
                  value => <div style={{height: 50}}>toggle: {value.count}</div>
                }
              </CountStore.Consumer>}
            </ShowStore.PureConsumer>
          </ShowStore.Provider>
          <CountStore.PureConsumer picker={value => value.count}>
            {
              count => <div style={{height: 50}}>{count}</div>
            }
          </CountStore.PureConsumer>
        </CountStore.Provider>
        <button onClick={toggleShow}>toggle show</button>
        <button onClick={addCount}>+1</button>
        <button onClick={minusCount}>-1</button>
      </Fragment>
    );
  }
}

export default App;
