import React from 'react';
import reactMixin from 'react-mixin';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TestComponent from '../components/test';
import AppBar from 'material-ui/lib/app-bar';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import LeftNav from 'material-ui/lib/left-nav';
import Paper from 'material-ui/lib/paper';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import { browserHistory, Router, Route, Link } from 'react-router';
import AppLeftNav from '../components/app-left-nav';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import {
  StylePropable,
  StyleResizable,
} from 'material-ui/lib/mixins';
import {Spacing} from 'material-ui/lib/styles';
import {
  Colors,
  getMuiTheme,
} from 'material-ui/lib/styles';

if (process.env.BROWSER) {
  require('./app.scss');
}
injectTapEventPlugin();

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftNavOpen: false,
      muiTheme: getMuiTheme()
   };
   this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
   this.handleClose = this.handleClose.bind(this);
   this.handleChangeRequestLeftNav = this.handleChangeRequestLeftNav.bind(this);
   this.handleRequestChangeList = this.handleRequestChangeList.bind(this);
   this.handleTouchTapHeader = this.handleTouchTapHeader.bind(this);
   this.componentWillMount = this.componentWillMount.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  handleTouchTapLeftIconButton() {
    this.setState({
      leftNavOpen: !this.state.leftNavOpen,
    });
  }

  handleClose (to){
    window.location = to;
    this.setState({open: false})
  }


  handleChangeMuiTheme(muiTheme) {
    this.setState({
      muiTheme: muiTheme,
    });
  }

  handleRequestChangeList(event, value) {
    this.props.history.push(value);
    this.setState({
      leftNavOpen: false,
    });
  }

  handleTouchTapHeader() {
    this.props.history.push('/');
    this.setState({
      leftNavOpen: false,
    });
  }

  componentWillMount() {
    this.setState({
      muiTheme: this.state.muiTheme,
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  handleChangeRequestLeftNav(open) {
    this.setState({
      leftNavOpen: open,
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
                <MenuItem value="/user" primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
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
