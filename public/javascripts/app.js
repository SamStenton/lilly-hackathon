var Vue = require('vue');
var VueResource = require("vue-resource")
Vue.use(VueResource);
if (window.Vue === undefined) {
    window.Vue = require('vue');
}

import remember from './components/remember.vue'

new Vue({
    el: "#app",
    components: {
    	remember
    }
});