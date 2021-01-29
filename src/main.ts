import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'ant-design-vue/dist/antd.css'
import antDesignVue from 'ant-design-vue'

// 导入节点编辑器
require('../node_modules/gojs/extensions/TextEditor.js');

// 导入辅助线
require('../node_modules/gojs/extensions/GuidedDraggingTool.js');

Vue.use(antDesignVue)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
