import React, { useEffect } from 'react';
import '@image/media/iconfont.css';

import { DemoFunc } from './demo';
export const Home = () => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    console.log(API_CONFIG);
  }, []);
  // demoFunc({name: '张三'})
  return (
    <div className='icon iconfont icon-xiazai'>
      homess
      <DemoFunc {...{ name: 'zhangsan' }} />
    </div>
  );
};
