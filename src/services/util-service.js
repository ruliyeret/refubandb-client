export const utilService = {
	saveToStorage,
	loadFromStorage,
	makeId,
	getRandomInt,
	getRandomColor,
	getPredefinedColor,
}

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
	let data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}

function makeId(length = 11) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return txt
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
	let color = '#'
	for (let i = 0; i < 6; i++) {
		const random = Math.random()
		const bit = (random * 16) | 0
		color += bit.toString(16)
	}
	return color
}

function getPredefinedColor(idx) {
	return [
		'#0D8CFF',
		'#FF2A19',
		'#00FFF7',
		'#FE9E00',
		'#0DFF74',
		'#8500FF',
		'#28a29a',
		'#FE6760',
		'#fa8af3',
	][idx]
}
