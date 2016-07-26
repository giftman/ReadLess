/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 * @providesModule F8ReadingView
 */

'use strict';

var F8Colors = require('../common/F8Colors');
var React = require('react');
var Navigator = require('Navigator');
var F8DrawerLayout = require('../common/F8DrawerLayout');
var View = require('View');
var StyleSheet = require('StyleSheet');
var TouchableOpacity = require('TouchableOpacity');
var Image = require('Image');
var { Text } = require('../common/F8Text');
var MenuItem = require('./MenuItem');
var Home = require('./reading/Home')
var ReadingInfo = require('./reading/ReadingInfo')

var { switchReadingTab} = require('../actions');
var { connect } = require('react-redux');

var LoginButton = require('../common/LoginButton');

import type {Tab} from '../reducers/navigation';

class WFReadingView extends React.Component {
  props:{
    tab:Tab;
    onTabSelect:(tab:Tab) => void;
    navigator:Navigator
  }
  constructor(props){
    super(props);

    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.openDrawer = this.openDrawer.bind(this);
  }

  getChildContext(){
    return {
    openDrawer:this.openDrawer,
    }
  }

  openDrawer(){
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab:Tab){
    if(this.props.tab != tab){
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  renderNavigationView(){
  return (
      <View style={styles.drawer}>

      <Image
      style={styles.header}
      source = {require('./info/img/info-background.png')}>

      <View>
        <Text style={styles.title}>慎读</Text>
        <Text style={styles.name}>选读，让时间回归生活</Text>
      </View>

      </Image>
      <MenuItem
      title="首页"
      selected={this.props.tab === 'home'}
      icon={require('./schedule/img/my-schedule-icon.png')}
      selectedIcon={require('./schedule/img/my-schedule-icon-active.png')}
      onPress={this.onTabSelect.bind(this,'home')}
      />

      <MenuItem
      title="关于"
      selected={this.props.tab === 'info'}
      icon={require('./info/img/info-icon.png')}
      selectedIcon={require('./info/img/info-icon-active.png')}
      onPress={this.onTabSelect.bind(this,'info')}
      />

      <View style={styles.loginPrompt}>
          <Text style={styles.loginText}>
            Log in to find your friends at F8.
          </Text>
          <LoginButton source="Drawer" />
        </View>

      </View>
  )
  }

  renderContent() {
      switch (this.props.tab) {
        case 'home':
          return (
  <Home navigator={this.props.navigator} />
          );
        case 'info':
          return (
  <ReadingInfo navigator={this.props.navigator} onPress={this.openDrawer}/>
          );
      }
  }

  render(){
    return (
      <F8DrawerLayout
      ref="drawer"
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={this.renderNavigationView}>
      {this.renderContent()}
      </F8DrawerLayout>
    )
  }
}

WFReadingView.childContextTypes = {
  openDrawer: React.PropTypes.func,
};

function select(store) {
  return {
    tab: store.navigation.tab,
  };
}

function actions(dispatch) {
  return {
    onTabSelect: (tab) => dispatch(switchReadingTab(tab)),
  };
}

var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    marginTop: 10,
    color: 'white',
    fontSize: 30,
    backgroundColor:'transparent'
  },
  name: {
    marginTop: 2,
    color: 'white',
    backgroundColor:'transparent',
    fontSize: 14,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  loginText: {
    fontSize: 12,
    color: F8Colors.lightText,
    textAlign: 'center',
    marginBottom: 10,
  },
});

module.exports = connect(select, actions)(WFReadingView);
