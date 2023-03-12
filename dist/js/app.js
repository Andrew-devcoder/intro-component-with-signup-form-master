require("dotenv").config();

console.log("Init!");

const form = document.querySelector(".form__body");
const tel = form.querySelector('input[type="tel"]');
const telMask = new Inputmask("+38 (999) 999 99 99");
telMask.mask(tel);
