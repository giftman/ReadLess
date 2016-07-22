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
* @providesModule ReadingDetail
* @flow
*/

'use strict';
var Platform = require('Platform');
var F8Colors = require('../../common/F8Colors');
var Image = require('Image');
var React = require('react');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/F8Text');
var F8Touchable = require('../../common/F8Touchable');
var F8Header = require('../../common/F8Header');
var View = require('View');
var {WebView} = require('react-native');
var Navigator = require('Navigator');
var ParallaxBackground = require('../../common/ParallaxBackground');

class ReadingDetail extends React.Component {
  props: {
    article:any;
    style: any;
    navigator: Navigator;
  };

  render() {
    var leftItem = this.props.leftItem;
    
      leftItem = {
        layout: 'icon',
        icon: require('../../common/img/back_white.png'),
        onPress: () => this.props.navigator.pop(),
      };
    
    var rightItem = {
      title: 'Menu',
      onPress: () => this.props.navigator.pop(),
    }
    var webView =
    <WebView
    ref='webview'
    automaticallyAdjustContentInsets={false}
    style={{flex: 1}}
    source={{uri: this.props.article.url}}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    scalesPageToFit={true}
    decelerationRate="normal"
    />;

    return (
      <View style={styles.container}>
      <F8Header
      style={{backgroundColor:"#5597B8"}}
      title={this.props.title}
      leftItem={leftItem}
      // rightItem={rightItem}
      >
      </F8Header>
      {webView}
      </View>
    );  }
  }


  var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    headerWrapper: {
      elevation: 2,
      backgroundColor: 'blue',
      // FIXME: elevation doesn't seem to work without setting border
      borderRightWidth: 1,
      marginRight: -1,
      borderRightColor: 'transparent',
    },
    headerTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    parallaxText: {
      color: 'white',
      fontSize: 42,
      fontWeight: 'bold',
      letterSpacing: -1,
    },
    stickyHeader: {
      position: 'absolute',
      top: F8Header.height,
      left: 0,
      right: 0,
    },
  });


  module.exports = ReadingDetail;
