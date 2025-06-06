const open1 = document.getElementById('open1')
const modal1 = document.getElementById('modal1')
const close1 = document.getElementById('close1')
const open2 = document.getElementById('open2')
const modal2 = document.getElementById('modal2')
const close2 = document.getElementById('close2')
const open3 = document.getElementById('open3')
const modal3 = document.getElementById('modal3')
const close3 = document.getElementById('close3')
const open4 = document.getElementById('open4')
const modal4 = document.getElementById('modal4')
const close4 = document.getElementById('close4')
const open5 = document.getElementById('open5')
const modal5 = document.getElementById('modal5')
const close5 = document.getElementById('close5')

function swipe(id) {
	let slides = document.getElementsByClassName('show')
	for (let i = 0; i < slides.length; i++) {
		slides[i].classList.remove('active')
	}
	document.getElementById(id).classList.add('active')
	document.getElementById(id).classList.add('animated')
	if (document.getElementById('focus1')) { // Check if focus1 exists before trying to set id to null
        document.getElementById('focus1').id = null
    }
}
function swipeSecond(id) {
	let slides = document.getElementsByClassName('show2')
	for (let i = 0; i < slides.length; i++) {
		slides[i].classList.remove('active')
	}
	document.getElementById(id).classList.add('active')
	document.getElementById(id).classList.add('animated')
	if (document.getElementById('focus2')) { // Check if focus2 exists
        document.getElementById('focus2').id = null
    }
}

open1.addEventListener('click', function () {
	modal1.showModal()
	document.body.style.overflow = 'hidden'
})
close1.addEventListener('click', function () {
	modal1.close()
	document.body.style.overflow = 'auto'
})
modal1.addEventListener('mouseup', function (event) {
	let rect = modal1.getBoundingClientRect()
	let isInDialog =
		rect.top <= event.clientY &&
		event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX &&
		event.clientX <= rect.left + rect.width
	if (!isInDialog) {
		modal1.close()
		document.body.style.overflow = 'auto'
	}
})

open2.addEventListener('click', function () {
	modal2.showModal()
	document.body.style.overflow = 'hidden'
})
close2.addEventListener('click', function () {
	modal2.close()
	document.body.style.overflow = 'auto'
})
modal2.addEventListener('mouseup', function (event) {
	let rect = modal2.getBoundingClientRect()
	let isInDialog =
		rect.top <= event.clientY &&
		event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX &&
		event.clientX <= rect.left + rect.width
	if (!isInDialog) {
		modal2.close()
		document.body.style.overflow = 'auto'
	}
})

open3.addEventListener('click', function () {
	modal3.showModal()
	document.body.style.overflow = 'hidden'
})
close3.addEventListener('click', function () {
	modal3.close()
	document.body.style.overflow = 'auto'
})
modal3.addEventListener('mouseup', function (event) {
	let rect = modal3.getBoundingClientRect()
	let isInDialog =
		rect.top <= event.clientY &&
		event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX &&
		event.clientX <= rect.left + rect.width
	if (!isInDialog) {
		modal3.close()
		document.body.style.overflow = 'auto'
	}
})

open4.addEventListener('click', function () {
	modal4.showModal()
	document.body.style.overflow = 'hidden'
})
close4.addEventListener('click', function () {
	modal4.close()
	document.body.style.overflow = 'auto'
})
modal4.addEventListener('mouseup', function (event) {
	let rect = modal4.getBoundingClientRect()
	let isInDialog =
		rect.top <= event.clientY &&
		event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX &&
		event.clientX <= rect.left + rect.width
	if (!isInDialog) {
		modal4.close()
		document.body.style.overflow = 'auto'
	}
})

open5.addEventListener('click', function () {
	modal5.showModal()
	document.body.style.overflow = 'hidden'
})
close5.addEventListener('click', function () {
	modal5.close()
	document.body.style.overflow = 'auto'
})
modal5.addEventListener('mouseup', function (event) {
	let rect = modal5.getBoundingClientRect()
	let isInDialog =
		rect.top <= event.clientY &&
		event.clientY <= rect.top + rect.height &&
		rect.left <= event.clientX &&
		event.clientX <= rect.left + rect.width
	if (!isInDialog) {
		modal5.close()
		document.body.style.overflow = 'auto'
	}
})

