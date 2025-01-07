import { util } from './util.js';
import { audio } from './audio.js';
import { theme } from './theme.js';
import { session } from './session.js';
import { storage } from './storage.js';
import { comment } from './comment.js';
import { offline } from './offline.js';
import { progress } from './progress.js';
import { confetti } from './confetti.js';
import { bootstrap } from './bootstrap.js';

export const guest = (() => {
    
    
    
    /**
     * @type {ReturnType<typeof storage>|null}
     */
    let information = null;

    /**
     * @returns {void}
     */
    const countDownDate = () => {
        let x;
        const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
        
        const until = document.getElementById('count-down')?.getAttribute('data-time')?.replace(' ', 'T');
        if (!until) {
            return;
        }

        let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "01/26/",
        birthday = dayMonth + yyyy;
          
          today = mm + "/" + dd + "/" + yyyy;
    
        let zzz= '01/26/2025'
        
          if (today > zzz) {
            clearInterval(x);
            alert('Acara pernikahan kami sudah selesai. Terima kasih banyak buat yang sudah hadir! :)');
            return;
          }
        const count = (new Date(zzz)).getTime();
       
       x = setInterval(() => {
            const distance = Math.abs(count - new Date().getTime());
            document.getElementById('day').innerText = Math.floor(distance / (day));
            document.getElementById('hour').innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
            
          if (distance < 0) {
            document.getElementById('day').innerText = '0';
            document.getElementById('hour').innerText = '0';
            document.getElementById('minute').innerText = '0';
            document.getElementById('second').innerText = '0';
            clearInterval(x);
            alert('Acara pernikahan kami sudah selesai. Terima kasih banyak buat yang sudah hadir! :)');
            }
        }, 1000);
    };

    /**
     * @param {string} id
     * @param {number} speed
     * @returns {void}
     */
    const opacity = (id, speed = 0.01) => {
        const el = document.getElementById(id);
        let op = parseFloat(el.style.opacity);

        let clear = null;
        const callback = () => {
            if (op > 0) {
                el.style.opacity = op.toFixed(3);
                op -= speed;
                return;
            }

            clearInterval(clear);
            clear = null;
            el.remove();
        };

        clear = setInterval(callback, 10);
    };

    /**
     * @returns {void}
     */
    const animation = () => {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ['#C71585','#fbbf24','#0D6EFD'];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    /**
     * @returns {void}
     */
    const name = () => {
        const raw = window.location.search.split('to=');
        let name = null;

        if (raw.length >= 2 && raw[1].length > 0) {
            name = decodeURIComponent(raw[1]);

            const guest = document.getElementById('guest-name');
            if (guest) {
                const div = document.createElement('div');
                div.classList.add('m-2');
                div.innerHTML = `
                <p class="mt-0 mb-1 mx-0 p-0" style="font-size: 0.95rem;">${guest.getAttribute('data-message')}</p>
                <h2 class="m-0 p-0">${util.escapeHtml(name)}</h2>`;

                guest.appendChild(div);
            }
        }

        const form = document.getElementById('form-name');
        if (form) {
            form.value = information.get('name') ?? name;
        }

        opacity('loading', 0.025);
    };

    /**
     * @param {HTMLButtonElement} button
     * @returns {void}
     */
    const open = (button) => {
        button.disabled = true;
        document.body.scrollIntoView({ behavior: 'instant' });

        if (!theme.isAutoMode()) {
            document.getElementById('button-theme').style.display = 'none';
        }

        confetti({
            origin: { y: 1 },
            zIndex: 1057
        });

        opacity('welcome', 0.025);

        audio.play();
        theme.spyTop();
        
        util.timeOut(animation, 1500);
    };

    /**
     * @param {HTMLImageElement} img
     * @returns {void}
     */
    const modal = (img) => {
        document.getElementById('show-modal-image').src = img.src;
        bootstrap.Modal.getOrCreateInstance('#modal-image').show();
    };

    /**
     * @returns {void}
     */
    const closeInformation = () => information.set('info', true);

    /**
     * @param {HTMLElement} svg
     * @param {number} timeout
     * @param {string} classes
     * @returns {void}
     */
    const animate = (svg, timeout, classes) => util.timeOut(() => svg.classList.add(classes), timeout);

    /**
     * @returns {void}
     */
    const normalize = () => {
        document.querySelectorAll('.font-arabic').forEach((el) => {
            el.innerHTML = String(el.innerHTML).normalize('NFC');
        });
    };

    /**
     * @returns {void}
     */
    const init = () => {
        audio.init();
        theme.init();
        session.init();
        offline.init();

        normalize();
        countDownDate();
        information = storage('information');

        if (session.isAdmin()) {
            storage('user').clear();
            storage('owns').clear();
            storage('likes').clear();
            storage('session').clear();
            storage('comment').clear();
            storage('tracker').clear();
        }

        if (information.has('presence')) {
            document.getElementById('form-presence').value = information.get('presence') ? '1' : '2';
        }

        const info = document.getElementById('information');
        if (info && information.get('info')) {
            info.remove();
        }

        const token = document.body.getAttribute('data-key');
        if (!token || token.length === 0) {
            progress.init();
            document.getElementById('comment')?.remove();
            document.querySelector('a.nav-link[href="#comment"]')?.closest('li.nav-item')?.remove();
        }

        if (token.length > 0) {
            // add 2 progress for config and comment.
            progress.add();
            progress.add();
            progress.init();

            session.setToken(token);
            session.guest().then((res) => {
                if (res.code !== 200) {
                    progress.invalid('config');
                    return;
                }

                progress.complete('config');

                comment.init();
                comment.comment()
                    .then(() => progress.complete('comment'))
                    .catch(() => progress.invalid('comment'));
            }).catch(() => progress.invalid('config'));
        }
    };

    return {
        init,
        open,
        name,
        modal,
        animate,
        closeInformation,
    };
})();