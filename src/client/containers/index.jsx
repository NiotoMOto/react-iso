import React from 'react';
import TestComponent from '../components/test';
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
