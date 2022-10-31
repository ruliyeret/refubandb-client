import Vue from 'vue'
import Vuex from 'vuex'
import stay from './modules/stay.js'
import user from './modules/user.js'
import order from './modules/order.js'

Vue.use(Vuex)

export default new Vuex.Store({
	// strict: true,
	modules: {
		stay,
		user,
		order,
	},
})
