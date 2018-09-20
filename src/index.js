import React from 'react';
import Observer from './Observer';
import { isFunction, isObject, isString, deepEqual, copy } from './util';

const init = (initialState = {}) => {
  const observer = new Observer();
  const Context = React.createContext();
  let _state = initialState;
  class Provider extends React.Component {
    state = initialState;
    componentDidMount() {
      observer.on('_update', this.updateState);
    };

    updateState = (updator, callback) => {
      if (isFunction(updator)) {
        this.setState(updator, () => this.afterUpdateState(callback));
      } else if (isObject(updator)) {
        this.setState(updator, () => this.afterUpdateState(callback));
      } else {
        console.error('cannot setState if updator is not Object or Function');
        return callback(this.state);
      }
    };

    afterUpdateState = (callback) => {
      _state = this.state;
      return callback(this.state);
    };

    shouldComponentUpdate(nextProps, nextState) {
      return !deepEqual(nextState, this.state);
    }

    componentWillUnmount() {
      observer.off('_update', this.updateState);
      _state = null;
    };

    render() {
      const { children } = this.props;
      return <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    }
  }

  class PureComponent extends React.Component {
    shouldComponentUpdate(nextProps) {
      return !deepEqual(nextProps.data, this.props.data)
    }

    render() {
      const { children, data } = this.props;
      return children(data)
    }
  }

  class PureConsumer extends React.Component {
    static defaultProps = {
      picker: v => v,
      children: () => null
    };
    render() {
      const { picker, children } = this.props;
      return <Context.Consumer>
        {value => <PureComponent data={picker(value)} children={children} />}
      </Context.Consumer>;
    }
  }

  return {
    Provider: Provider,
    Consumer: Context.Consumer,
    update: (updator) => {
      return new Promise((resolve, reject) => {
        observer.emit('_update', updator, (state) => state ? resolve(state) : reject(state));
      })
    },
    get: (picker) => {
      if (isString(picker)) {
        return copy(_state[picker]);
      } else if (isFunction(picker)) {
        return copy(picker(_state));
      } else {
        return copy(_state);
      }
    },
    PureConsumer: PureConsumer,
  }
};


export default init;