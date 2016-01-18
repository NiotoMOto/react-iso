import React from 'react';
import TestComponent from './test.js';
if (process.env.BROWSER) {
  require('./index.scss');
}


export default class IndexComponent extends React.Component {
  render() {
    return (
      <div>
        <TestComponent test="bouton"></TestComponent>
        <p className="paragraphe">This is the index page</p>
      </div>
    );
  }
}
