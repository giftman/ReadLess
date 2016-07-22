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
 * @providesModule ReadingCell
 * @flow
 */

'use strict';

var F8Colors = require('../../common/F8Colors');
var Image = require('Image');
var React = require('react');
var StyleSheet = require('StyleSheet');
var { Text } = require('../../common/F8Text');
var F8Touchable = require('../../common/F8Touchable');
var View = require('View');
// var formatDuration = require('./formatDuration');
// var formatTime = require('./formatTime');
var moment = require('moment');
var { connect } = require('react-redux');


class ReadingCell extends React.Component {
  props: {
    session: any;
    onPress: ?() => void;
    style: any;
  };

  render() {
    var article = this.props.session;
    var title = article.title;
    // console.log('before' + title);
    title = title.replace(/&nbsp;/g,' ');
    // var time;
    // if (this.props.showStartEndTime) {
    //   time = formatTime(session.startTime) + ' - ' + formatTime(session.endTime);
    // } else {
    //   time = formatDuration(session.startTime, session.endTime);
    // }
    // var location = session.location && session.location.toUpperCase();
    // var locationColor = F8Colors.colorForLocation(location);
    var cell =
        <View style={styles.containerItem}>
          <Image
            style={{width: 88, height: 66, marginRight: 10}}
            source={{uri: article.contentImg}}
          />
          <View style={{flex: 1, flexDirection: 'column'}} >
            <Text numberOfLines={2} tyle={styles.title}>
              {article.title}
            </Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
              <Text style={{flex:1,fontSize: 14, color: '#87CEFA', marginTop: 5}}>
                {article.userName}
              </Text>
              <Text style={{fontSize: 14, color: '#aaaaaa', marginTop: 5, justifyContent:'flex-end', marginRight: 5}}>
                {moment(article.date).fromNow()}
              </Text>

            </View>
          </View>
        </View>;
      // <View style={[styles.cell, this.props.style]}>
      //   <View style={styles.titleSection}>
      //     <Text numberOfLines={2} style={styles.titleText}>
      //       {session.title}
      //     </Text>
      //   </View>
      //   <Text numberOfLines={1} style={styles.duration}>
      //     <Text style={[styles.locationText, {color: locationColor}]}>
      //       {location}
      //     </Text>
      //     {location && ' - '}
      //     {time}
      //   </Text>
      //   {tick}
      // </View>;

    if (this.props.onPress) {
      cell =
        <F8Touchable onPress={this.props.onPress}>
          {cell}
        </F8Touchable>;
    }

    return cell;
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    flex: 3,
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  },
  listView: {
    backgroundColor: '#eeeeec'
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  },
  cell: {
    paddingVertical: 15,
    paddingLeft: 17,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleSection: {
    paddingRight: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleAndDuration: {
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: F8Colors.darkText,
    marginBottom: 4,
    marginRight: 10,
  },
  duration: {
    fontSize: 12,
    color: F8Colors.lightText,
  },
  locationText: {
    fontSize: 12,
  },
  added: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
  },
});


module.exports = connect()(ReadingCell);
