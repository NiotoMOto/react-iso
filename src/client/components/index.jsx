import React from 'react';
import TestComponent from './test';
if (process.env.BROWSER) {
  require('./index.scss');
}


export default class IndexComponent extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}
