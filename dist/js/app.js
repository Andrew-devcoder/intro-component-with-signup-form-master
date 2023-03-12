require("dotenv").config();

console.log("Init!");

const form = document.querySelector(".form__body");
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask("+38 (999) 999-99-99");
inputMask.mask(telSelector);
