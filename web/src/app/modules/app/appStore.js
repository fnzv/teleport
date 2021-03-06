/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var { Store, toImmutable } = require('nuclear-js');

var { TLPT_APP_INIT, TLPT_APP_FAILED, TLPT_APP_READY, TLPT_APP_SET_SITE_ID } = require('./actionTypes');

var defaultStatus = toImmutable({
  isReady: false,
  isInitializing: false,
  isFailed: false  
});

export default Store({

  getInitialState() {    
    return toImmutable({
      siteId: undefined,
      status: defaultStatus
    });
  },

  initialize() {
    this.on(TLPT_APP_INIT, state => state.set('status', defaultStatus.set('isInitializing', true)));
    this.on(TLPT_APP_READY, state => state.set('status', defaultStatus.set('isReady', true)));
    this.on(TLPT_APP_FAILED, state => state.set('status', defaultStatus.set('isFailed', true)));
    this.on(TLPT_APP_SET_SITE_ID, (state, siteId) => state.set('siteId', siteId) );        
  }
})
