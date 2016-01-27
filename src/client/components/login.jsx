import React from 'react';
import TestComponent from './test';
if (process.env.BROWSER) {
  require('./about.scss');
}


export default class LoginComponent extends React.Component {

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
