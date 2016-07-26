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

var ReadingCell = require('./ReadingCell');
var Navigator = require('Navigator');
var React = require('react');
var PureListView = require('../../common/PureListView');
var FilterArticles = require('./FilterArticles');
type Props = {
  typeId: number;
  articles: Array<any>;
  navigator: Navigator;
  renderEmptyList?: () => ReactElement;
};

class ReadingListView extends React.Component {
  props: Props;
  _innerRef: ?PureListView;

  constructor(props: Props) {
    super(props);

    this.state = {
      articles:FilterArticles.byType(this.props.articles,this.props.typeId),
      typeId:this.props.typeId
    };
    this._innerRef = null;
    this.renderRow = this.renderRow.bind(this);
    this.renderEmptyList = this.renderEmptyList.bind(this);
    this.storeInnerRef = this.storeInnerRef.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    // console.log('ReadingListView');
    // console.log(nextProps.typeId);
    if (nextProps.articles !== this.props.articles ||
        nextProps.typeId !== this.props.typeId) {
      this.setState({
        typeId:nextProps.typeId,
        articles:FilterArticles.byType(nextProps.articles,nextProps.typeId)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('componentWillUpdate');
    // if (this.state.typeId !== nextState.typeId) {
    //   this.setState({
    //      typeId: nextState.typeId,
    //      articles:FilterArticles.byType(nextState.articles,nextState.typeId)
    //   });
    // }
  }

//   shouldComponentUpdate(nextProps, nextState) {
//   return nextProps.typeId !== this.props.typeId;
// }

  render() {
    // console.log('ReadingListView render');
    // console.log(this.state.articles[0]);
    return (
      <PureListView
        ref={this.storeInnerRef}
        data={this.state.articles}
        renderRow={this.renderRow}
        {...this.props}
        renderEmptyList={this.renderEmptyList}
      />
    );
  }


  renderRow(article: any, typeId: number) {
    return (
      <ReadingCell
        onPress={() => this.openSession(article, typeId)}
        session={article}
      />
    );
  }

  renderEmptyList(): ?ReactElement {
    const {renderEmptyList} = this.props;
    return renderEmptyList && renderEmptyList();
  }

  openSession(article: any, typeId: number) {
    this.props.navigator.push({
      typeId,
      article,
      articles: this.state.articles,
    });
  }

  storeInnerRef(ref: ?PureListView) {
    this._innerRef = ref;
  }

  scrollTo(...args: Array<any>) {
    this._innerRef && this._innerRef.scrollTo(...args);
  }

  getScrollResponder(): any {
    return this._innerRef && this._innerRef.getScrollResponder();
  }
}

module.exports = ReadingListView;
