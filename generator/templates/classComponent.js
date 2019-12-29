module.exports = ({ name, Name }) => `import React, { Component } from 'react';
import styles from './styles.module.scss';

interface IProps {
  initialConter: number;
}

interface IState {
  counter: number;
}

export default class ${Name} extends Component<IProps, IState> {
  state = {
    counter: 0,
  };
  constructor(props) {
    super(props);
    this.state.counter = props.initialState;
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
  }
  plus() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
  minus() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }
  render() {
    return (
      <div className={styles.element}>
        <h1>Hello component {this.state.counter} ${name}</h1>
        <button onClick={this.plus}>+</button>
        <button onClick={this.minus}>-</button>
      </div>
    );
  }
}
`;
