import { util } from './util.js';
import { guest } from './guest.js';
import { theme } from './theme.js';
import { comment } from './comment.js';
import { render } from './render.js';



document.addEventListener('DOMContentLoaded', () => {
    guest.init();
    window.AOS.init();
    window.util = util;
    window.guest = guest;
    window.theme = theme;
    window.comment = comment;
    window.render = render;
});

var goFS = document.getElementById('goFS');
var btn_kado = document.getElementById('btn_kado');
var btn_hadiah = document.getElementById('btn_hadiah');
var Elbody = document.querySelector("body");

goFS.addEventListener('click', function () {
    Elbody.style.overflowY = 'scroll';
    util.fullscreen();
}, false);
window.addEventListener("load", function () {
    Elbody.style.overflowY = 'hidden';
    window.scrollTo(0, 1);
});

btn_kado.addEventListener('click', function () {
    document.getElementById('kado').style.display = "block";
    document.getElementById('hadiah').style.display = "none";
}, false);

btn_hadiah.addEventListener('click', function () {
    document.getElementById('hadiah').style.display = "block";
    document.getElementById('kado').style.display = "none";
}, false);



