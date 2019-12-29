module.exports = ({ name, Name }) => `import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCounter, plus, minus } from '../../actions/counter';
import { getCounter } from '../../reducers/counter';
import styles from './styles.module.scss';

interface IProps {
  initialConter: number;
  setCounter: (value: number) => any;
  plus: () => any;
  minus: () => any;
}

interface IState {
  counter: number;
}

const mapStateToProps = state => ({
  initialCounter: getCounter(state),
});

const mapDispatchToProps = dispatch => ({
  plus: () => plus(),
  setCounter: (value: number) => dispatch(setCounter(value)),
  minus,
});

class ${Name} extends Component<IProps, IState> {
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
  setCounter() {
    const { setCounter } = this.props;
    const { counter } = this.state;
    setCounter(counter);
  }
  render() {
    return (
      <div className={styles.element}>
        <h1>Hello component {this.state.counter} ${name}</h1>
        <button onClick={this.plus}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.props.plus}>Redux +</button>
        <button onClick={this.props.minus}>REdux -</button>
        <button onClick={this.setCounter}>Set counter to redux</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${Name});
`;
