module.exports = ({ name, Name }) => `import React, { useState } from 'react';
import styles from './styles.module.scss';

interface IProps {
  counter: number;
}

const ${Name} = (props: IProps) => {
  const [counter, setCounter] = useState(props.counter);

  const plus = () => setCounter(counter + 1);
  const minus = () => setCounter(counter - 1);

  return (
    <div className={styles.element}>
      <h1>Hello component {counter} ${name}</h1>
      <button onClick={plus}>+</button>
      <button onClick={minus}>-</button>
    </div>
  );
};

export default ${Name};
`;
