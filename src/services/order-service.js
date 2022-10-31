import { httpService } from './http.service.js'

export const orderService = {
	query,
	getById,
	remove,
	save,
	getEmptyOrder,
}

const BASE_URL = 'order/'

async function query() {
	return await httpService.get(BASE_URL)
}

function getById(orderId) {
	return httpService.get(`${BASE_URL}${orderId}`)
}

function remove(orderId) {
	return httpService.delete(`${BASE_URL}${orderId}`)
}

function save(order) {
	if (order._id) {
		return httpService.put(`${BASE_URL}${order._id}`, order)
	} else {
		return httpService.post(BASE_URL, order)
	}
}

function getEmptyOrder() {
	return {}
}
