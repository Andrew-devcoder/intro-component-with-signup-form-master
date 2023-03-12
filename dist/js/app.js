// require('dotenv').config();

console.log('Init!');

// const form = document.querySelector(".form__body");
// const telSelector = form.querySelector('input[type="tel"]');
// const inputMask = new Inputmask("+38 (999) 999-99-99");
// inputMask.mask(telSelector);

// import Inputmask from 'inputmask';
// var Inputmask = require('inputmask');

const form = document.querySelector('form');
const myInput = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+38 (999) 999-99-99');
inputMask.mask(myInput);

// Inputmask({ 'mask': '(999) 999-9999' }).mask(myInput);
