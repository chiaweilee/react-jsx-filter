/* eslint-disable no-param-reassign */

import React from 'react';
import ReactDOM from 'react-dom';

function capitalize(value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function concat(value, str) {
  return value + str;
}

ReactDOM.render(<div>{ 'hello' | capitalize | concat(' world!') }</div>, document.getElementById('root'));
