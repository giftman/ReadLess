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

const FacebookSDK = require('../FacebookSDK');
const ActionSheetIOS = require('ActionSheetIOS');
const {Platform} = require('react-native');
const Alert = require('Alert');
const AV = require('leancloud-storage');

import type { Action, ThunkAction } from './types';

// async function ParseFacebookLogin(scope): Promise {
//   return new Promise((resolve, reject) => {
//     Parse.FacebookUtils.logIn(scope, {
//       success: resolve,
//       error: (user, error) => reject(error && error.error || error),
//     });
//   });
// }

async function AVFacebookLogin(_auth): Promise {
  return new Promise((resolve, reject) => {
    AV.User.signUpOrlogInWithAuthData(autho,{
      success: resolve,
      error: (error) => reject(error && error.error || error),
    });
  });
}

async function queryFacebookAPI(path, ...args): Promise {
  return new Promise((resolve, reject) => {
    FacebookSDK.api(path, ...args, (response) => {
      if (response && !response.error) {
        resolve(response);
      } else {
        reject(response && response.error);
      }
    });
  });
}

async function _logInWithFacebook(source: ?string): Promise<Array<Action>> {

  return new Promise((resolve,reject) => {
    FacebookSDK.login((response) => {
      if(response && !response.error){
        // resolve(response);
        resolve(AVFacebookLogin({'facebook':{'uid':response.userID,'access_token':response.accessToken}}));
      }else{
        reject(response && response.error);
      }
    },{scope :''});
  })
}

function logInWithFacebook(source: ?string): ThunkAction {
  return (dispatch) => {
    const login = _logInWithFacebook(source);
    // Loading friends schedules shouldn't block the login process
    login.then(
      (result) => {
      dispatch(result);
      }
    ).catch((error) => console.log(error));
    return login;
  };
}

function skipLogin(): Action {
  return {
    type: 'SKIPPED_LOGIN',
  };
}

function logOut(): ThunkAction {
  return (dispatch) => {
    AV.User.logOut();
    FacebookSDK.logout();

    // TODO: Make sure reducers clear their state
    return dispatch({
      type: 'LOGGED_OUT',
    });
  };
}

function logOutWithPrompt(): ThunkAction {
  return (dispatch, getState) => {
    let name = getState().user.name || 'there';

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: `Hi, ${name}`,
          options: ['Log out', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            dispatch(logOut());
          }
        }
      );
    } else {
      Alert.alert(
        `Hi, ${name}`,
        'Log out from Here?',
        [
          { text: 'Cancel' },
          { text: 'Log out', onPress: () => dispatch(logOut()) },
        ]
      );
    }
  };
}

module.exports = {logInWithFacebook, skipLogin, logOut, logOutWithPrompt};
