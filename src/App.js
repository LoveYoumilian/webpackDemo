import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'antd';
import { Home } from '@page/Home';
import '@css/index.less';
import '@css/index.scss';
console.log('2222');
const App = () => {
  return (
    <>
      <Home />
      <div className='box1'>
        <Button type='primary' onClick={() => console.log('666')}>
          test webPack
        </Button>
      </div>
    </>
  );
};
export default hot(App);
