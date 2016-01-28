import * as React from 'react';
import TestComponent from '../components/test';
if (process.env.BROWSER) {
  require('./index.scss');
}

const {Component} = React;


export default class IndexComponent extends Component<void, void> {
  render() {
    return (
      <div>
      </div>
    );
  }
}
