import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home.vue'
import stayApp from '@/views/stay-app.vue'
import stayDetails from '@/views/stay-details.vue'
import stayEdit from '@/views/stay-edit.vue'
import userProfile from '@/views/user-profile.vue'
import userWishlist from '@/views/user-wishlist.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: home,
	},

	{
		path: '/stay',
		component: stayApp,
	},
	{
		path: '/stay/q/:city?',
		component: stayApp,
	},
	{
		path: '/stay/edit/:stayId?',
		component: stayEdit,
	},
	{
		path: '/stay/:stayId',
		component: stayDetails,
	},
	{
		path: '/profile/:userId',
		component: userProfile,
	},
	{
		path: '/profile/:userId/:becomeHost?',
		component: userProfile,
	},
	{
		path: '/wishlist/:userId',
		component: userWishlist,
	},
]

const router = new VueRouter({
	routes,
})

export default router
