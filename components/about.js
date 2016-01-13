import React from 'react';
import TestComponent from './test.js';

export default class AboutComponent extends React.Component {

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
        <TestComponent test="1"></TestComponent>
        <p>A little bit about me.</p>
      </div>
    );
  }
}
