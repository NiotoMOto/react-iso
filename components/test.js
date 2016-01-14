import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button'

export default class TestComponent extends React.Component {

  handleClick(){
    console.log('click');
  }

  render(){
    return (
      <div>
        <RaisedButton onClick={this.handleClick} label={this.props.test} />
      </div>
    )
  }
}
