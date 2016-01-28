
import *  as React from 'react';
import reactMixin from 'react-mixin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TestComponent from '../components/test';
import LeftNavAppBar from '../components/app-left-nav';
import {CardHeader, CardText, Paper, MenuItem, IconButton, IconMenu} from 'material-ui';
import {Spacing, Colors,ThemeManager, RawTheme} from 'material-ui/lib/styles/';
import { browserHistory, Router, Route, Link } from 'react-router';
import AppLeftNav from '../components/app-left-nav';
import {StylePropable,  StyleResizable,} from 'material-ui/lib/mixins/';

if (process.env.BROWSER) {
  require('./app.scss');
}
injectTapEventPlugin();

const {Component} = React;
interface IProps {
  test: string,
  history:any
}

interface IState {
  leftNavOpen: any,
  muiTheme: RawTheme
}
ThemeManager
class AppComponent extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      leftNavOpen: false,
      muiTheme: ThemeManager.getMuiTheme()
   };
  //  this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
  //  this.handleClose = this.handleClose.bind(this);
  //  this.handleChangeRequestLeftNav = this.handleChangeRequestLeftNav.bind(this);
  //  this.handleRequestChangeList = this.handleRequestChangeList.bind(this);
  //  this.handleTouchTapHeader = this.handleTouchTapHeader.bind(this);
  //  this.componentWillMount = this.componentWillMount.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  handleTouchTapLeftIconButton() {
    const opened = this.state.leftNavOpen;
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
      muiTheme: this.state.muiTheme,
    });
  }

  handleClose (to){
    window.location = to;
    this.setState({
      muiTheme: this.state.muiTheme,
      leftNavOpen: false
    })
  }


  handleChangeMuiTheme(muiTheme) {
    this.setState({
     leftNavOpen: this.state.leftNavOpen,
      muiTheme: muiTheme
    });
  }

  handleRequestChangeList(event, value) {
    this.props.history.push(value);
    this.setState({
      leftNavOpen: false,
      muiTheme: this.state.muiTheme
    });
  }

  handleTouchTapHeader() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
      muiTheme: this.state.muiTheme
    });
  }

  componentWillMount() {
    this.setState({
      leftNavOpen: this.state.leftNavOpen,
      muiTheme: this.state.muiTheme
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      leftNavOpen: this.state.leftNavOpen,
      muiTheme: newMuiTheme
    });
  }

  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open,
      muiTheme: this.state.muiTheme
    });
  }

  getStyles() {
    const darkWhite = Colors.darkWhite;
    const styles = {
      appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0
      },
      title : {
        cursor: 'pointer'
      },
      root: {
        paddingTop: Spacing.desktopKeylineIncrement,
        minHeight: 400,
      },
      content: {
        margin: Spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${Spacing.desktopGutter * 2}px ${Spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  render() {
    const {
      history,
      location,
      children,
    } = this.props;

    let docked = false;
    let showMenuIconButton = true;
    let title = 'Coloquons';
    let {
      leftNavOpen,
    } = this.state;
    const styles = this.getStyles();

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      docked = true;
      leftNavOpen = true;
      showMenuIconButton = false;

      styles.leftNav = {
        zIndex: styles.appBar.zIndex - 1,
      };
      styles.root.paddingLeft = 256;
      styles.footer.paddingLeft = 256;
    }
    return (
        <div>
          <AppBar
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            onTitleTouchTap={this.handleTouchTapHeader}
            titleStyle={styles.title}
            title={title}
            zDepth={0}
            style={styles.appBar}
            showMenuIconButton={showMenuIconButton}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem index={1} value="/user" primaryText="Refresh" />
                <MenuItem index={2} primaryText="Help" />
                <MenuItem index={3} primlaryText="Sign out" />
              </IconMenu>
            }
          />
          {title !== '' ?
            <div style={this.prepareStyles(styles.root)}>
              <div style={this.prepareStyles(styles.content)}>
                {React.cloneElement(children, {
                  onChangeMuiTheme: this.handleChangeMuiTheme,
                })}
              </div>
            </div>
            :
            children
          }
          <AppLeftNav
            style={styles.leftNav}
            docked={docked}
            history={history}
            location={location}
            onRequestChangeLeftNav={this.handleChangeRequestLeftNav}
            onRequestChangeList={this.handleRequestChangeList}
            open={leftNavOpen}
          />
        </div>
    );
  }
}

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object,
}

AppComponent.propTypes = {
  children: React.PropTypes.node,
  history: React.PropTypes.object,
  location: React.PropTypes.object,
}

reactMixin(AppComponent.prototype, StylePropable);
reactMixin(AppComponent.prototype, StyleResizable);

export default AppComponent;
