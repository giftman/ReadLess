'use strict';

import React from 'react';
import {
  Dimensions,
  Image,
  View,
  InteractionManager,
} from 'react-native';
var {Text} = require('../../common/F8Text');
var F8Colors = require('../../common/F8Colors');
var StyleSheet = require('StyleSheet');
var {height, width} = Dimensions.get('window');
var Navigator = require('Navigator');
class SplashView extends React.Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        this.props.navigator.resetTo({ start:123 });
      });
    }, 2000);
  }

componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (

      <View
        style={styles.container}
        >
        <View style = {styles.section}>
      <Image
      source={require('./img/icon.png')}
      />
        </View>

        <View style = {styles.section}>
        </View>

        <View style = {[styles.section,styles.last]}>
        <Text style={styles.loginComment}>@copyright winfan#hittheroad.com</Text>
        </View>
      </View>
    );
  }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(74 * scale),
    color: F8Colors.darkText,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: F8Colors.darkText,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

module.exports = SplashView;
