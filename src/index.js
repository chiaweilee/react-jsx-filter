/* eslint-disable no-param-reassign */

import React from 'react';
import ReactDOM from 'react-dom';

function capitalize(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

ReactDOM.render(<div>{ 'hello world' | capitalize }</div>, document.getElementById('root'));
