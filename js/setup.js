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

var WFApp = require('./WFApp');
var FacebookSDk = require('./FacebookSDK');
import React from 'react';

var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');
const AV = require('leancloud-storage');
var Platform = require('Platform');
import {APP_ID,APP_KEY,version,channel} from './env';
class Root extends React.Component {
    constructor() {
      super();

      FacebookSDk.init();
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
      
      this.state = {
        store: configureStore(),
      };
    }
    render() {
    	var content = (<WFApp />);
      return (
        <Provider store={this.state.store}>
        {content}
        </Provider>
      );
    }
  };



module.exports = () => Root;
