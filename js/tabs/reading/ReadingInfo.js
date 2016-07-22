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
* @providesModule ReadingInfo
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
var Navigator = require('Navigator');
var Dimensions = require('Dimensions');

class ReadingInfo extends React.Component {
  props: {
    article:any;
    style: any;
    navigator: Navigator;
    onPress:any;
  };

  constructor(props){
    super(props);
    this.handleShowMenu = this.handleShowMenu.bind(this);
  }

  handleShowMenu() {
    this.context.openDrawer();
  }

  render() {
    var leftItem = this.props.leftItem;
    if (!leftItem) {
      leftItem = {
        layout: 'icon',
        icon: require('../../common/img/back_white.png'),
        onPress: this.props.onPress,
      };
    }
    return (
      <View style={styles.container}>
      <F8Header
      style={{backgroundColor:"#5597B8"}}
      title={this.props.title}
      leftItem={leftItem}
      >
      </F8Header>
      <View style={styles.section}>
      <Image source={require('./img/icon.png')} />
      <Text style={styles.title}>
      让时间回归生活
      </Text>
      </View>
      <View style={styles.section}>
      <Text style={styles.description}>
      每个主题每天推送约20篇网络热搜文章，限制阅读数量，谢谢下载。
      </Text>
      </View>
      <View style={[styles.section,styles.last]}>
      <Text style={styles.loginComment}>
      免责声明 :所有内容均来自网络收集(Test)
      </Text>
      </View>
      </View>
    );  }
  }


  const scale = Dimensions.get('window').width / 375;
  var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    textContainer:{
      padding: 26,
      paddingBottom: 60,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: -1,
      lineHeight: 32,
      marginVertical: 20,
    },
    time: {
      color: F8Colors.lightText,
      marginBottom: 20,
    },
    description: {
      fontSize: 17,
      lineHeight: 25,
    },
    section: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 26,
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


  module.exports = ReadingInfo;
