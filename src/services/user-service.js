import { httpService } from './http.service.js'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
	removeStay,
	getLoggedInUser,
}

window.userService = userService

const BASE_URL = 'user/'

async function getUsers() {
	return await httpService.get(BASE_URL)
}
async function getById(userId) {
	return await httpService.get(`${BASE_URL}${userId}`)
}
async function remove(userId) {
	return await httpService.delete(`${BASE_URL}${userId}`)
}
async function update(user, isHost) {
	if (user && !isHost) _saveLocalUser(user)
	return await httpService.put(`${BASE_URL}${user._id}`, user)
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
	const user = await httpService.post('auth/signup', userCred)
	return _saveLocalUser(user)
}

async function logout() {
	sessionStorage.clear()
	return await httpService.post('auth/logout')
}

async function removeStay(stayId, user) {
	const idx = user.stays.findIndex(stay => stay._id === stayId)
	user.stays.splice(idx, 1)
	return await httpService.put(`${BASE_URL}${user._id}`, user)
}

function getLoggedInUser() {
	return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

function _saveLocalUser(user) {
	sessionStorage.setItem('loggedinUser', JSON.stringify(user))
	return user
}
