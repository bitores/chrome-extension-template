import Vue from 'vue'
import root from './root.vue'
import {Button} from 'vant';
Vue.config.productionTip = false
Vue.use(Button);


{{#if components.locales}}
// used in Vue rendering
Vue.prototype.__ = chrome.i18n.getMessage

{{/if}}

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(root)
})
