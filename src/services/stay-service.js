import { httpService } from './http.service.js'

export const stayService = {
	query,
	getById,
	remove,
	save,
	getEmptyStay,
}

const BASE_URL = 'stay/'

async function query(filterBy) {
	return await httpService.get(BASE_URL, filterBy)
}

async function getById(stayId) {
	return await httpService.get(`${BASE_URL}${stayId}`)
}

async function remove(stayId) {
	return await httpService.delete(`${BASE_URL}${stayId}`)
}

async function save(stay) {
	return stay._id
		? await httpService.put(BASE_URL + stay._id, stay)
		: await httpService.post(BASE_URL, stay)
}

function getEmptyStay() {
	return {
		name: '',
		price: 0,
		summary: '',
		imgUrls: [],
		propertyType: '',
		accommodates: 0,
		amenities: [],
		loc: {
			country: '',
			address: '',
		},
		reviews: [],
	}
}
