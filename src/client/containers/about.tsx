/// <reference path="react.d.ts" />

import * as React from 'react';
import TestComponent from '../components/test';
if (process.env.BROWSER) {
  require('./about.scss');
}

const {Component} = React;
interface IProps {
  test: string
}

interface IState {
  test: string
}



export default class AboutComponent extends Component<IProps, IState> {

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
        About page
      </div>
    );
  }
}
