import React from 'react';
import ReactDOM from 'react-dom/client';
import { View } from './views/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <View />
  </React.StrictMode>
);


