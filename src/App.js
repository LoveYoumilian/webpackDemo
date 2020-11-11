import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import { Button } from 'antd';
import { Home } from '@page/Home';
import '@css/index.scss';
import '@css/index.less';
const App = () => {
  return (
    <>
      <Home />
      <div className='box1'>
        <Button type='primary' onClick={() => console.log('111')}>
          test box1是21321
        </Button>
      </div>
      <div className='box1'>
        <Button type='primary' onClick={() => console.log('666')}>
          test webPacksss
        </Button>
      </div>
    </>
  );
};


setConfig({
  showReactDomPatchNotification: false
})

export default hot(module)(App);
