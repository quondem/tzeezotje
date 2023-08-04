import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev',
    },
});

let burger = document.querySelector('.header__burger')
let logo = document.querySelector('.header__logo')
let menu = document.querySelector('.header__nav')
let body = document.querySelector('body')
burger.addEventListener('click', function () {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
    body.classList.toggle('lock')
    logo.classList.toggle('active')
})


let form = document.querySelector('.modal__form')
let inputEmail = document.querySelector('.email')
let inputDate = document.querySelector('.date')
let inputTime = document.querySelector('.time')
let successText = document.querySelector('.modal__success')
function validateForm() {
    validateEmail()
    validateDate()
    validateTime()
    if (validateEmail() && validateDate() && validateTime()) {
        return true
    }
}
form.addEventListener('submit', async function (e) {
    e.preventDefault()
    let formData = new FormData(form)
    if (validateForm()) {
        let response = await fetch('send.php',
            {
                method: 'POST',
                body: formData
            })
        if (response.ok) {
            let result = await response
            form.classList.add('success')
            successText.classList.add('active')
        } else {
            alert('Ошибка')
        }

    }
})
function validateEmail() {
    if (inputEmail.value.match(/\w{1,}/)) {
        inputEmail.classList.remove('wrong')
        return true
    } else {
        inputEmail.classList.add('wrong')
        return false
    }
}
inputEmail.addEventListener('input', function () {
    validateEmail()
})
function validateDate() {
    if (inputDate.value.match(/\w{1,}/)) {
        inputDate.classList.remove('wrong')
        return true
    } else {
        inputDate.classList.add('wrong')
        return false
    }
}
inputDate.addEventListener('input', function () {
    validateDate()
})
function validateTime() {
    if (inputTime.value.match(/\w{2,}/)) {
        inputTime.classList.remove('wrong')
        return true
    } else {
        inputTime.classList.add('wrong')
        return false
    }
}
inputTime.addEventListener('input', function () {
    validateTime()
})

const modalButton = document.querySelector('.info__reserve')
const modal = document.querySelector('.modal')
const closeButtons = document.querySelectorAll('.close')
modalButton.addEventListener('click', function () {
    modal.classList.add('open')
})
function closeModal() {
    modal.classList.remove('open')
}
for (let closeButton of closeButtons) {
    closeButton.addEventListener('click', function () {
        closeModal()
    })
}
body.addEventListener('click', function (e) {
    if (e.target.closest('.info__reserve')) {
        return 1
    }
    if (!e.target.closest('.modal__content')) {
        closeModal()
    }
})