module.exports = ({ name, Name }) => `import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setCounter, plus, minus } from '../../actions/counter';
import { getCounter } from '../../reducers/counter';
import styles from './styles.module.scss';

interface IProps {
  counter: number;
}

const ${Name} = (props: IProps) => {
  const [counterLocal, setCounterLocal] = useState(props.counter);
  const dispatch = useDispatch();
  const counter = useSelector(getCounter, shallowEqual);

  const plusLocal = () => setCounterLocal(counterLocal + 1);
  const minusLocal = () => setCounterLocal(counterLocal - 1);

  const plusRedux = () => dispatch(plus());
  const minusRedux = () => dispatch(minus());

  const setCounterRedux = () => dispatch(setCounter(counterLocal));
  return (
    <div className={styles.element}>
      <h1>
        Hello component {counterLocal} {counter} ${name}
      </h1>
      <button onClick={plusLocal}>+</button>
      <button onClick={minusLocal}>-</button>
      <button onClick={plusRedux}>Redux +</button>
      <button onClick={minusRedux}>Redux -</button>
      <button onClick={setCounterRedux}>Set counter to redux</button>
    </div>
  );
};

export default ${Name};
`;
