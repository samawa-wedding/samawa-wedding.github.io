import { util } from './util.js';
import { guest } from './guest.js';
import { theme } from './theme.js';
import { comment } from './comment.js';

document.addEventListener('DOMContentLoaded', () => {
    guest.init();
    window.AOS.init();

    window.util = util;
    window.guest = guest;
    window.theme = theme;
    window.comment = comment;
});

var goFS = document.getElementById('goFS');
        var Elbody = document.querySelector("body");
        goFS.addEventListener('click',function () {
        Elbody.style.overflowY='scroll';
        util.fullscreen();
        },false);
        window.addEventListener("load",function() {
        Elbody.style.overflowY='hidden';
        window.scrollTo(0, 1);
        });