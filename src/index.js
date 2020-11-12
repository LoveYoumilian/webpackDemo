import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(() => {
        console.log('service注册成功');
      })
      .catch(() => {
        console.log('service注册失败');
      });
  });
}
ReactDOM.render(<App />, document.getElementById('root'));
