import { useEffect, useState } from 'react';
import api, { getRickAndMortyList } from '../../utils/api';

export const StyleGuide = () => {
  // start here
  const [state, setState] = useState(1);
  const [list, setList] = useState([]);

  useEffect(() => {
    const request = () =>
      api.getRickAndMortyList(state).then((res) => setList(res.results));
    getRickAndMortyList().then((data) => console.log({ data }));
    request();
  }, [state]);

  const handleClick = () => {
    setState(state + 1);
  };

  return (
    //  start render
    <>
      <div>
        <button className='btn' onClick={handleClick}>
          Следующая страница
        </button>
        <button
          className='btn'
          disabled={state === 1}
          onClick={() => setState(state - 1)}
        >
          Предыдущая страница
        </button>
        <div style={{ marginTop: '20px' }}>
          <b>Значение - {state}</b>
        </div>

        <div>
          {!!list.length &&
            list.map((e) => (
              <div key={e.id}>
                <span> {e.name}</span>
                <img src={e.image} alt='' />
              </div>
            ))}
        </div>
      </div>
    </>
    //  finish render
  );
  // finish here
};

// useEffect используется для побочных действий в компоненте.
// 1. useEffect(() => {}); useEffect будет срабатывать на каждый ререндер компонента.
// 2. useEffect(() => {}, []); useEffect будет срабатывать только один раз в начале работы компонента.
// 3. useEffect(() => {}, [smth]); useEffect будет срабатывать только при изменении зависимостей.

// next.js - ssr

// if (state > 0) {
//   setState(9);
// }
// const func = async () => { await }
