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

const {AppEventsLogger} = require('react-native-fbsdk');

import type {Action} from '../actions/types';

function track(action: Action): void {
  switch (action.type) {
    case 'LOADED_ARTICLES':
      console.log('LOADED_ARTICLES');
      AppEventsLogger.logEvent('LOADED_ARTICLES', 1);
      break;

    case 'LOADED_CATAGORY':
      // Parse.Analytics.track('removeFromSchedule', {id: action.id});
      AppEventsLogger.logEvent('LOADED_CATAGORY', 1);
      break;

    case 'TURNED_ON_PUSH_NOTIFICATIONS':
      AppEventsLogger.logEvent('Enabled Push', 1);
      break;

  }
}

module.exports = track;
