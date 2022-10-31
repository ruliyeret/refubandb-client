import Vue from 'vue'
import app from './app.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/styles.scss'
import locale from 'element-ui/lib/locale/lang/en'
import 'vue-loaders/dist/vue-loaders.css'
import VueLoaders from 'vue-loaders'
import VueSocialSharing from 'vue-social-sharing'
import VueClipboard from 'vue-clipboard2'
import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
	clientId: '707231563844-e5cpkqrlt62gncmj6b84of5sml9lp8g9.apps.googleusercontent.com',
	scope: 'profile email',
	prompt: 'select_account',
}
Vue.use(GoogleAuth, gauthOption)
Vue.use(VueClipboard)
Vue.use(VueSocialSharing)
Vue.config.lang = 'en'
Vue.use(Element, { locale })
Vue.use(VueLoaders)
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(require('vue-moment'))
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyCfm1LKS_iiah-t54R0JBYlfmPkEk5AYBA',
		libraries: 'places',
	},
})

new Vue({
	router,
	store,
	render: h => h(app),
}).$mount('#app')
