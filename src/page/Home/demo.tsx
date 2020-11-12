import React from 'react';

interface demo {
  name: string;
  age?: number;
}
const Button = (props: demo) => {
  return <div>{props?.name || '按钮'}</div>;
};
export const DemoFunc = (obj: demo) => {
  console.log(obj);
  return <Button {...obj} />;
};
