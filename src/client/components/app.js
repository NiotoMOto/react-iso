import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TestComponent from './test.js';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { browserHistory, Router, Route, Link } from 'react-router'

injectTapEventPlugin();
export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = (to) => {
    window.location = to;
    this.setState({open: false})
  };

  render() {
    return (
        <div>
          <AppBar
            title="Colocons"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <LeftNav
            open={this.state.open}
            docked={false}
            onRequestChange={open => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleClose.bind(this, '/')}>Home</MenuItem>
            <MenuItem onTouchTap={this.handleClose.bind(this, '/about')}>About</MenuItem>
          </LeftNav>
          <Card>
          <CardHeader
            title="Colocons"
            subtitle="Antoine"/>
          { this.props.children }
          </Card>
        </div>
    );
  }
}
