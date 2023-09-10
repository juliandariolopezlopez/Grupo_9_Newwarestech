const emailInp = document.querySelector('#email');
const passwordInp = document.querySelector('#password');
const errorsList = document.querySelector('errors');
const submitBtn = document.querySelector('#submit-boton');


emailInp.oninput = (e) => {
    const isEmailCorrect = e.target.value.includes('@');

    if (isEmailCorrect) {
        e.target.nextElementSibling.innerHTML = 'El email no es valido'
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

