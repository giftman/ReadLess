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


var ListContainer = require('../../common/ListContainer');
var Navigator = require('Navigator');
var React = require('react');
var Platform = require('Platform');
var F8DrawerLayout = require('../../common/F8DrawerLayout');
var ReadingListView = require('./ReadingListView');
var ReadingFilter = require('./ReadingFilter');
var EmptySchedule = require('../schedule/EmptySchedule')

var { connect } = require('react-redux');
var {switchType} = require('../../actions');


type Props = {
  dispatch:any;
  catagory: {};
  userCatagory:[];
  articles: Array<any>;
  navigator: Navigator;
  switchType: (typeId: number) => void;
};

class Home extends React.Component {
  props: Props;
  _drawer: ?F8DrawerLayout;

  constructor(props) {
    super(props);

		this.state={
			indexm:this.props.indexm,
			userCatagory:this.props.userCatagory
		}
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.switchDay = this.switchDay.bind(this);
    this.openFilterScreen = this.openFilterScreen.bind(this);
    this.renderNavigationView = this.renderNavigationView.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.userCatagory);
     if (nextProps.userCatagory !== this.props.userCatagory ||
        nextProps.indexm !== this.props.indexm) {
      this.setState({
         indexm: nextProps.indexm,
         userCatagory:nextProps.userCatagory
      });
    }
  }

//   componentWillUpdate(nextProps, nextState) {
//     if (this.state.indexm !== nextState.indexm) {
//       this.setState({
//          indexm: nextState.indexm,
//       });
//     }
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//   return nextProps.userCatagory !== this.props.userCatagory;
// }
  render() {
    const filterItem = {
      icon: require('../../common/img/filter.png'),
      title: 'Filter',
      layout:'icon',
      onPress: this.openFilterScreen,
    };
    // const listViewContent = {
    //   this.props.userCatagory.forEach(
    //     console.log(" ");
    //   )
    // };
    var images = [];
    // console.log('HomeRender');
    // console.log(this.state.userCatagory);
    if(this.props.catagory){
      for (var i = 0; i < this.state.userCatagory.length; i++) {
        images.push(
          <ReadingListView
            typeId = {this.state.userCatagory[i]}
            title={this.props.catagory[this.state.userCatagory[i]]}
            key={this.state.userCatagory[i]}
            articles={this.props.articles}
            renderEmptyList={this.renderEmptyList}
            navigator={this.props.navigator}
          />
        );
      }
    }

    const content = (
      <ListContainer
        title="首页"
        selectedSegment={this.props.indexm}
        onSegmentChange={this.switchDay}
        backgroundColor="#5597B8"
        backgroundImage={require('../schedule/img/schedule-background.png')}
        selectedSectionColor="#51CDDA"
        rightItem={filterItem}>
          {images}
      </ListContainer>
    );

    // if (Platform.OS === 'ios') {
    //   return content;
    // }
    return (
      <F8DrawerLayout
        ref={(drawer) => this._drawer = drawer}
        drawerWidth={200}
        drawerPosition="right"
        renderNavigationView={this.renderNavigationView}>
        {content}
      </F8DrawerLayout>
    );
  }

  renderNavigationView() {
    return <ReadingFilter onClose={() => this._drawer && this._drawer.closeDrawer()} />;
  }

  renderEmptyList() {
    return (
      <EmptySchedule
        title={`暂时没有数据`}
        text="后台努力加载中，请稍等..."
      />
    );
  }

  openFilterScreen() {
    // if (Platform.OS === 'ios') {
    //   this.props.navigator.push({ filter: 123 });
    // } else {
      this._drawer && this._drawer.openDrawer();
    // }
  }

  switchDay(indexm) {
    this.props.switchType(indexm);
  }
}

function select(store) {
  return {
    catagory: store.reading.catagory,
    articles: store.reading.articles|| [],
    userCatagory:store.reading.userCatagory,
    indexm:store.navigation.indexm,
  };
}

function actions(dispatch) {
  return {
    switchType: (indexm) => dispatch(switchType(indexm)),
    dispatch:dispatch
  };
}

module.exports = connect(select, actions)(Home);
