'use strict';

import * as React from 'react';
import TestComponent from '../components/test';

const {Component} = React;

if (process.env.BROWSER) {
  require('./about.scss');
}

interface IProps {
  test: string
}

interface IState {
  test: string
}

export default class LoginComponent extends Component<IProps, IState> {

  constructor(props){
    super(props);
    this.state = {
      test: this.props.test
    };
  }

  clickButton(){
    this.setState({test : 'mix'});
  }

  render() {
    return (
      <div>
        User page
      </div>
    );
  }
}
