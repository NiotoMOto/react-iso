import React from 'react';
import TestComponent from '../components/test';
if (process.env.BROWSER) {
  require('./about.scss');
}


export default class UserComponent extends React.Component {

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
