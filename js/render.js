import { data } from "./data.js";

export const render = (() => {

    const welcomePage = (() => {
        document.getElementById("welcomePage").innerHTML = `
            <img src="${data.link.welcomeBackground}" alt="bg" class="bg-cover-welcome"
             style="max-width: 100%; max-height: 100%" />
            <div class="text-center">
                <div class="animate__animated animate__backInDown animate__slower">
                    <h2 class="font-esthetic mb-4 text-dark" style="font-size: 3rem; font-weight: 350">
                        The Wedding Of
                    </h2>
                    <img src="${data.link.welcomePhoto}" alt="background"
                        class="img-center-crop rounded-circle border border-3 border-light shadow mb-4 mx-auto" />
                    <h2 class="font-esthetic my-4 text-dark" style="font-size: 3.5rem; font-weight: 350;">
                        ${data.bride.L.alias} &amp; ${data.bride.P.alias}
                    </h2>
                    <div id="guest-name" data-message="Kepada Yth Bapak/Ibu/Saudara/i"></div>
                </div>
                <div class="animate__animated animate__backInUp animate__slower">
                    <button type="button"
                        class="btn btn-light shadow rounded-4 mt-4 animate__animated animate__swing animate__slow animate__delay-3s animate__infinite "
                        id="goFS" onclick="guest.open(this)" style="position: relative">
                        <i class="fa-solid fa-envelope-open me-2"></i>Buka Undangan
                    </button>
                </div>
            </div>`;
    })();


    const home = (() => {
        document.getElementById("homeItem").innerHTML = `
            <img src="${data.link.homeBackground}" alt="bg"
                class="position-absolute opacity-25 top-50 start-50 translate-middle bg-cover-home" />

            <div class="position-relative text-center p-2">
                <h1 class="font-esthetic my-4 fw-medium" style="font-size: 2.3rem">
                    Undangan Pernikahan
                </h1>

                <img src="${data.link.homePhoto}" alt="bg" onclick="guest.modal(this)"
                    class="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto" />

                <h2 class="font-esthetic my-4" style="font-size: 2.5rem; font-weight: 600">
                    ${data.bride.L.alias} &amp; ${data.bride.P.alias}
                </h2>
                <p class="my-2" style="font-size: 1rem; padding: 0.5rem">
                   ${data.time.reception.day}, ${data.time.reception.date} ${data.time.reception.month} ${data.time.reception.year}
                </p>

                <a class="btn btn-outline-light btn-sm shadow rounded-pill px-3 py-3" target="_blank"
                    href="${data.link.calendar}">
                    <i class="fa-solid fa-calendar-check me-2"></i>Save The Date
                </a>

                <div class="d-flex justify-content-center align-items-center mt-4 mb-2">
                    <div class="mouse-animation border border-secondary-subtle border-2 rounded-5 px-2 py-1">
                        <div class="scroll-animation rounded-4 bg-secondary"></div>
                    </div>
                </div>
                <p class="m-0 p-0 text-secondary" style="font-size: 1rem">
                    Scroll Down
                </p>
            </div> `;
    })();

    const renderBrideMale = (() => {
        const brideMale = document.getElementById("brideMale");
        brideMale.innerHTML = `
            <img src="${data.bride.L.image}" alt="cowo" onclick="guest.modal(this)"
                class="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto" />
            <h2 class="font-esthetic m-0" style="font-size: 3rem">${data.bride.L.name}</h2>
            <p class="mt-3 mb-1" style="font-size: 1.25rem">${data.bride.L.child}</p>
            <p class="mb-0" style="font-size: 0.95rem">
            ${data.bride.L.father} dan ${data.bride.L.mother}
            </p>
        
        `;
    })();

    const renderBrideFemale = (() => {
        const brideFemale = document.getElementById("brideFemale");
        brideFemale.innerHTML = `
            <img src="${data.bride.P.image}" alt="cewek" onclick="guest.modal(this)"
            class="img-center-crop rounded-circle border border-3 border-light shadow my-4 mx-auto" />
            <h2 class="font-esthetic m-0" style="font-size: 3rem">${data.bride.P.name}</h2>
            <p class="mt-3 mb-1" style="font-size: 1.25rem">${data.bride.P.child}</p>
            <p class="mb-0" style="font-size: 0.95rem">${data.bride.P.father} dan ${data.bride.P.mother}</p>`;
    })();

    const akad = (() => {
        const akad = document.getElementById("akad");
        akad.innerHTML = `<h2 class="font-esthetic m-0 py-2" style="font-size: 2.5rem">Akad</h2>
                <p style="font-size: 0.95rem">${data.time.marriage.day}, ${data.time.marriage.date} ${data.time.marriage.month} ${data.time.marriage.year}</p>
                <p class="m-0 mb-0" style="font-size: 0.95rem">${data.time.marriage.address}</p>
                <p class="m-0 mb-1" style="font-size: 0.95rem">Pukul ${data.time.marriage.hours.start} WIB - ${data.time.marriage.hours.finish}</p>`;
    })();

    const resepsi = (() => {
        document.getElementById(
            "resepsi"
        ).innerHTML = `<h2 class="font-esthetic m-0 py-2" style="font-size: 2.5rem">Resepsi</h2>
                <p style="font-size: 0.95rem">${data.time.reception.day}, ${data.time.reception.date} ${data.time.reception.month} ${data.time.reception.year}</p>
                <p class="m-0 mb-0" style="font-size: 0.95rem">${data.time.reception.address}</p>
                <p class="m-0 mb-1" style="font-size: 0.95rem">Pukul ${data.time.reception.hours.start} WIB - ${data.time.reception.hours.finish}</p>`;
    })();

    const lokasi = (() => {
        document.getElementById("lokasi").innerHTML = `
            <small class="d-block my-3">${data.time.reception.address}</small>
            <a href="${data.link.map}" target="_blank" class="btn btn-outline-light btn-sm rounded-pill shadow mb-2 px-3">
            <i class="fa-solid fa-map-location-dot me-2"></i>Lihat Google Maps</a>
            `;
    })();

    const galeri = (() => {
        const galeriElement = document.querySelector(".galeri");
        const showAllContainer = galeriElement.querySelector("div:nth-of-type(2)");

        const [
            _,
            figureElement,
            paginationElement,
            prevButton,
            nextButton,
            showAllButton,
        ] = galeriElement.children[0].children;
        const [__, showAllBox, closeButton] = showAllContainer.children;

        const initializeGallery = () => {
            const initialImage = data.galeri[0];
            const initialImagez = data.galeri[2];

            figureElement.innerHTML = `<img src="${initialImage.image}" alt="galeri image" id="${initialImage.id}">`;


            data.galeri.forEach((item, index) => {
                paginationElement.innerHTML += `<li data-id="${item.id}" ${index === 0 ? 'class="active"' : ""
                    }></li>`;
            });

            updateNavigationButtons(initialImage.id);
        };

        const updateGalleryImage = (id) => {
            const selectedImage = data.galeri.find((item) => item.id === id);

            if (selectedImage) {
                figureElement.innerHTML = `<img src="${selectedImage.image}" alt="galeri image" id="${selectedImage.id}">`;

                paginationElement.querySelectorAll("li").forEach((li) => {
                    li.classList.toggle("active", parseInt(li.dataset.id) === id);
                });
            }
        };

        const updateNavigationButtons = (id) => {
            nextButton.dataset.id = `${id}`;
            prevButton.dataset.id = `${id}`;
        };

        const autoPlayGallery = () => {
            let id = parseInt(nextButton.dataset.id);
            id = id < data.galeri.length ? id + 1 : 1;
            updateNavigationButtons(id);
            updateGalleryImage(id);
        };

        nextButton.addEventListener("click", () => {
            let id = parseInt(nextButton.dataset.id);
            if (id < data.galeri.length) {
                id++;
                updateNavigationButtons(id);
                updateGalleryImage(id);
            }
        });

        prevButton.addEventListener("click", () => {
            let id = parseInt(prevButton.dataset.id);
            if (id > 1) {
                id--;
                updateNavigationButtons(id);
                updateGalleryImage(id);
            }
        });

        showAllButton.addEventListener("click", () => {
            showAllBox.innerHTML = data.galeri
                .map((item) => `<img src="${item.image}" alt="image galeri">`)
                .join("");
            showAllContainer.classList.add("active");
        });

        closeButton.addEventListener("click", () => {
            showAllBox.innerHTML = "";
            showAllContainer.classList.remove("active");
        });

        initializeGallery();
        setInterval(autoPlayGallery, 5000);

        paginationElement.querySelectorAll("li").forEach((pagination) => {
            pagination.addEventListener("click", (e) => {
                const id = +e.target.dataset.id;
                updateGalleryImage(id);
            });
        });
    })();

    const kadorekening = (() => {
        for (var i = 0; i < (data.bank).length; i++) {
            var badge = document.createElement('div');
            badge.innerHTML =
                `<div class="row row-cols-2">
                <div class="col card-body border rounded-4 shadow p-4 mx-4 mt-2 mb-4 text-start"
                data-aos="fade-down" data-aos-duration="2500">
                <img src="${data.bank[i].icon}"
                class="img-fluid p-1 rounded" style="max-width: 9vh; background-color: var(--bs-light)" alt="bri">
                <div class="d-flex justify-content-between align-items-center mt-2">
                <p class="m-0 p-0" style="font-size: 0.95rem">${data.bank[i].rekening}</p>
                <button class="btn btn-outline-dark btn-sm rounded-4"
                data-copy="${data.bank[i].rekening}" onclick="util.copy(this, 'Tersalin')">
                <i class="fa-solid fa-copy me-1"></i>Salin</button>
                </div>
                <p class="mt-2 mb-0 p-0" style="font-size: 0.95rem">${data.bank[i].name}</p>
                </div>`;
            document.getElementById("kado_rekening").appendChild(badge);
        }
    })();

    const hadiah = (() => {
        document.getElementById("hadiahItem").innerHTML = `
                                        <div class="row row-cols-2">
                                <div class="col card-body border rounded-4 shadow p-4 mx-4 mt-2 mb-4 text-center"
                                    data-aos="fade-down" data-aos-duration="2500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"
                                        viewBox="0 0 48 48">
                                        <defs>
                                            <style>
                                                .cls-1 {
                                                    fill: #ffde76
                                                }

                                                .cls-2 {
                                                    fill: #fc6
                                                }

                                                .cls-3 {
                                                    fill: #db5669
                                                }

                                                .cls-4 {
                                                    fill: #f26674
                                                }

                                                .cls-6 {
                                                    fill: #ffba55
                                                }
                                            </style>
                                        </defs>
                                        <g id="Gift">
                                            <path class="cls-1" d="M29 11h18v8H29z" />
                                            <path class="cls-2" d="M1 11h18v8H1z" />
                                            <path class="cls-1" d="M10 11h9v8h-9z" />
                                            <path class="cls-2" d="M29 19h15v28H29z" />
                                            <path class="cls-1" d="M29 19h15v26H29z" />
                                            <path class="cls-2" d="M4 19h15v28H4z" />
                                            <path class="cls-1" d="M10 21h9v24h-5a4 4 0 0 1-4-4V21z" />
                                            <path class="cls-3" d="M19 11h10v36H19z" />
                                            <path class="cls-4" d="M19 11h10v34H19z" />
                                            <path class="cls-3" d="M36 6a5 5 0 0 1-5 5h-5V6a5 5 0 0 1 10 0z" />
                                            <path class="cls-4" d="M30 1.1a5 5 0 0 1-1 9.9h2a5 5 0 1 0-1-9.9z" />
                                            <path class="cls-3" d="M22 6v5h-5a5 5 0 1 1 5-5z" />
                                            <path class="cls-4"
                                                d="M17 1a5 5 0 0 0-4.9 6A5 5 0 0 1 22 8V6a5 5 0 0 0-5-5z" />
                                            <path class="cls-3" d="M26 6.41V11h-4V6.41a5.09 5.09 0 0 1 4 0z" />
                                            <path class="cls-4"
                                                d="M25 6.1v1a4.71 4.71 0 0 0-1-.1c-2.34 0-2 1.21-2-.59a5.13 5.13 0 0 1 3-.31z" />
                                            <path class="cls-3"
                                                d="M26 6.41v1c-1.25-.55-1 .13-1-1.31a4.84 4.84 0 0 1 1 .31z" />
                                            <path d="M26 7.41V11h-1V7.1a4.84 4.84 0 0 1 1 .31z" style="fill:#c4455e" />
                                            <path class="cls-6" d="M4 19h6v2H4z" />
                                            <path class="cls-2" d="M10 19h8v2h-8zM29 19h15v2H29z" />
                                            <path class="cls-6" d="M18 19h1v2h-1z" />
                                            <path class="cls-6" d="M18 19h1v2h-1z" />
                                            <path class="cls-2" d="M18 11h1v8h-1zM18 21h1v24h-1z" />
                                        </g>
                                    </svg>
                                    <p class="mt-4" style="font-size: 1rem">
                                        Anda dapat mengirim kado ke:
                                    </p>
                                    <div class="mb-0">
                                        ${data.alamat_hadiah}
                                    </div>
                                    <button class="btn btn-outline-dark btn-sm rounded-4 mt-3"
                                        data-copy="${data.alamat_hadiah}"
                                        onclick="util.copy(this, 'Alamat Tersalin')">
                                        <i class="fa-solid fa-copy me-1"></i>Salin Alamat
                                    </button>
                                </div>
                            </div>
            `;
    })();

    const footer = (() => {
        document.getElementById(
            "footer"
        ).innerHTML = `
                <p style="font-size: 1.3rem">${data.bride.L.alias} &amp; ${data.bride.P.alias}</p>
                <div class="mb-2 mx-auto border border-3 border-light" data-aos="fade-down" data-aos-duration="2000"
                    style="height: 240px; width: 190px; overflow: hidden; border-radius: 250px 250px 0px 0px; padding: 10px;">
                    <img src="${data.link.footerPhoto}" alt="bg" onclick="guest.modal(this)"
                        style="width: 100%; height: 100%; object-fit: cover; border-radius: 250px 250px 0px 0px;" />
                </div>
                <div class="row pb-1 pt-1">
                    <div class="col-sm-2 col-6 m-auto">
                        <p style="font-size: 10px">Kel. ${data.bride.L.father} & ${data.bride.L.mother}</p>
                    </div>
                    <div class="col-sm-2 col-6 m-auto">
                        <p style="font-size: 10px">Kel. ${data.bride.P.father} & ${data.bride.P.mother}</p>
                    </div>
                </div>
        `;
    })();

    return {
        welcomePage,
        home,
        renderBrideMale,
        renderBrideFemale,
        akad,
        resepsi,
        lokasi,
        galeri,
        kadorekening,
        hadiah,
        footer
    };
})();
