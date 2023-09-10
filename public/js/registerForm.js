const emailInp = document.querySelector('#email');
const usernameInp = document.querySelector('#username');
const passwordInp = document.querySelector('#password');
const errorsList = document.querySelector('.errors');
const submitBtn = document.querySelector('#submit-boton');
const confirmpassword = document.querySelector('#confirmpassword');
const imageInp = document.querySelector('#image');

emailInp.oninput = (e) => {
    const isEmailCorrect = e.target.value.includes('@');

    if (isEmailCorrect) {
        e.target.nextElementSibling.innerHTML = 'El email no es valido'
    } else {
        e.target.nextElementSibling.innerHTML = ''
    }
}

usernameInp.oninput = (e) => {
    const name = e.target.value.includes('');

    if (name) {
        e.target.nextElementSibling.innerHTML = 'El usuario no es valido'
    } else {
        e.target.nextElementSibling.innerHTML = ''
    }
}


passwordInp.oninput = (e) => {
    const length = e.target.value.length;

    if (length < 8) {
    e.target.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 8 caracteres'
    } else {
    e.target.nextElementSibling.innerHTML = ''
    }
}

confirmpasswordInp.oninput = (e) => {
    const length = e.target.value.length;

    if (length < 8) {
    e.target.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 8 caracteres'
    } else {
    e.target.nextElementSibling.innerHTML = ''
    }
}

imageInpInp.oninput = (e) => {
    const isImageCorrect = e.target.value.im;

    if (isImageCorrect) {
    e.target.nextElementSibling.innerHTML = 'La imagen debe ser (JPG, JPEG, PNG, GIF)'
    } else {
    e.target.nextElementSibling.innerHTML = ''
    }
}