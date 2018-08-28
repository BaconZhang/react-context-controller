import React from 'react';
import Observer from './Observer';
import { isFunction, isObject, deepEqual } from './util';

const init = (initialState = {}) => {
  const observer = new Observer();
  const Context = React.createContext();
  class Provider extends React.Component {
    state = initialState;
    componentDidMount() {
      observer.on('_update', this.updateState);
    };

    updateState = (updator) => {
      if (isFunction(updator)) {
        this.setState(updator);
      } else if (isObject(updator)) {
        this.setState(updator);
      } else {
        console.error('cannot setState if updator is not Object or Function');
      }
    };
  
    componentWillUnmount() {
      observer.off('_update', this.updateState);
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
    update: (updator) => observer.emit('_update', updator),
    PureConsumer: PureConsumer,
  }
};


export default init;