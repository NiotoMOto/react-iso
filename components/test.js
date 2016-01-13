import React from 'react';

export default class TestComponent extends React.Component {

  handleClick(){
    console.log('handleClick');
  }

  render(){
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}
