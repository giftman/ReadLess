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

import type {Action} from '../actions/types';

export type Article = {
    typeId: number,
    title: string,
    contentImg: string,
    userName: string,
    url: string,
    date: string,
};

type State = {
  articles:{};
  readed:{};
  userCatagory:[];
  catagory:{};
  catagoryName:[];
};

const initialState: State = {articles:{},userCatagory:[0,2,12,19]};

function reading(state: State = initialState, action: Action): State {
  if  (action.type === 'LOADED_ARTICLES') {
      let list = action.list.map(fromLeanCloudArticles);
      return {...state, articles: list};
  }
  if  (action.type === 'LOADED_CATAGORY') {
      let list = {}
      let listName = []
      for (let li of action.list){
        list[li.get('typeId')] = li.get('name')
        listName[li.get('typeId')] = li.get('name');
      }
      return {...state, catagory:list,catagoryName:listName};
  }
  
  if (action.type === 'APPLY_CATAGORY') {
    return {...state, userCatagory:action.userCatagory};
  }
  return state;
}

function fromLeanCloudArticles(object: Object): Notification {
  return {
    typeId: object.get('typeId'),
    title: object.get('title'),
    contentImg: object.get('contentImg'),
    userName: object.get('userName'),
    url: object.get('url'),
    date: object.createdAt.getTime(),
  };
}

module.exports = reading;
