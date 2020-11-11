import React, { useEffect } from 'react';
import '@image/media/iconfont.css'
export const Home = () => {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    console.log(API_CONFIG);
  }, []);
  return <div className="icon iconfont icon-xiazai">homess</div>;
};
