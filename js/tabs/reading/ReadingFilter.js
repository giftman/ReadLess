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
*/
'use strict';

const React = require('react');
const F8Header = require('../../common/F8Header');
const F8Colors = require('../../common/F8Colors');
const TopicItem = require('../../filter/TopicItem');
const F8Button = require('../../common/F8Button');
const ActionSheetIOS  = require('ActionSheetIOS');
const Alert = require('Alert');
const Platform = require('Platform');
var ItemsWithSeparator = require('../../common/ItemsWithSeparator');

import {
  Animated,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

const shallowEqual = require('fbjs/lib/shallowEqual');
const {
  applyCatagory
} = require('../../actions');
const {connect} = require('react-redux');

class ReadingFilter extends React.Component {
  props: {
    topics: Array<string>;
    selectedTopics: [];
    applyCatagory:() => void;
    topicsDic:any;
    navigator: any;
    onClose: ?() => void;
  };
  state: {
    selectedTopics: [];
    anim: Animated.Value;
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTopics: this.props.selectedTopics,
      anim: new Animated.Value(0),
    };

    (this: any).applyFilter = this.applyFilter.bind(this);
    (this: any).clearFilter = this.clearFilter.bind(this);
    (this: any).close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedTopics !== nextProps.selectedTopics) {
      this.setState({selectedTopics: nextProps.selectedTopics});
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.selectedTopics !== nextState.selectedTopics) {
      const changedTopics = !shallowEqual(
        nextProps.selectedTopics,
        nextState.selectedTopics,
      );
      const toValue = changedTopics ? 1 : 0;
      Animated.spring(this.state.anim, {toValue}).start();
    }
  }

  render() {
    var bottom = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });

    var topics;
    if(this.props.topics){
      topics = this.props.topics.map((topic, ii) => (
      <TopicItem
      key={topic}
      topic={topic}
      color={F8Colors.colorForTopic(this.props.topics.length, ii)}
      isChecked={(!contain(this.state.selectedTopics,ii) === false) || contain(this.state.selectedTopics,ii) === 0}
      onToggle={this.toggleTopic.bind(this, topic)}
      />
    ));
    } 
    var selectedAnyTopics = this.state.selectedTopics.length > 0;

    let leftItem, rightItem;
    if (this.props.navigator) {
      leftItem = {title: 'Cancel', onPress: this.close};
    }
    if (selectedAnyTopics) {
      rightItem = {
        title: '清除',
        icon: require('../../common/img/x-white.png'),
        onPress: this.clearFilter,
      };
    }
    return (
      <View style={styles.container}>
      <F8Header
      title="选择主题"
      leftItem={leftItem}
      rightItem={rightItem}
      />
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <ItemsWithSeparator separatorStyle={styles.separator}>
      {topics}
      </ItemsWithSeparator>
      </ScrollView>
      <Animated.View style={[styles.applyButton, {bottom}]}>
      <F8Button
      caption='确定'
      onPress={this.applyFilter}
      />
      </Animated.View>
      </View>
    );
  }

  toggleTopic(topic: string, value: boolean) {
    var selectedTopics = this.state.selectedTopics.slice(0);
    var topics = this.props.topics;
    var typeId;
    for (var index = 0; index < topics.length; index++) {
      if(topics[index] === topic){
        typeId = index;
      }
    }
    var index = contain(selectedTopics,typeId);
    if (index || index === 0 ) {
      selectedTopics.splice(index,1);
    } else {
      selectedTopics.push(typeId);
    }
    //这里引用了同一个数组吧
    this.setState({selectedTopics});
  }

  applyFilter() {
    var le = this.state.selectedTopics.slice(0).length;
    if( le > 5 || le === 0){
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            title: `Master 现在已选${le}个主题,为了更快速浏览，请选择1到5个主题`,
            options: ['确定'],
            cancelButtonIndex: 0,
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        Alert.alert(
          `Master 现在已选${le}个主题`,
          '为了更快速浏览，请选择1到5个主题',
          [
            { text: '确定' },
          ]
        );
      }

    }else{
    this.props.applyCatagory(this.state.selectedTopics);
    this.close();
    }
  }

  close() {
    const {navigator, onClose} = this.props;
    if (navigator) {
      requestAnimationFrame(() => navigator.pop());
    }
    if (onClose) {
      onClose();
    }
  }

  clearFilter() {
    this.setState({selectedTopics: []});
  }
}

function contain(parent,child){
  var le = parent.length;
  while(le--){
    if(parent[le] === child){
      return le;
    }
  }
  return false;
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5597B8',
  },
  scrollview: {
    padding: 20,
    paddingBottom: 20 + 49,
  },
  separator: {
    backgroundColor: '#FFFFFF26',
  },
  applyButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: '#5597B8',
  },
});

function select(store) {
  return {
    topics: store.reading.catagoryName,
    selectedTopics: store.reading.userCatagory,
    topicsDic: store.reading.catagory,
  };
}
function actions(dispatch) {
  return {
    applyCatagory:(userCatagory) => dispatch(applyCatagory(userCatagory)),
  };
}

module.exports = connect(select,actions)(ReadingFilter);
