// Nav
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const body = document.querySelector('body');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x')
    navbar.classList.toggle('active');
}) 

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');

    setTimeout(() => {
        header.classList.add('active');
    }, 1000);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');

    setTimeout(() => {
        barsBox.classList.add('active');
    }, 650);

    setTimeout(() => {
        body.classList.remove('active');
    }, 1200)

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x')
    navbar.classList.remove('active');
} 

navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        
        e.preventDefault();

        if(!link.classList.contains('active')) {

            //body.classList.remove('first');
            body.classList.add('active');
            
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 500);
        }
    });
});

logoLink.addEventListener('click', (e) => {

    e.preventDefault();
    
    if(!navLinks[0].classList.contains('active')) {

        body.classList.add('active');
        
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 500);
    }
});

// Funcionalidad Resumen
const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {

        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });

        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });

        resumeDetails[idx].classList.add('active');
    })
});

// Carrusel de portafolio
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');

    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    
    if (!imgSlide) return; // Protección si no existe
    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });

    portfolioDetails[index].classList.add('active');
}

arrowRight && arrowRight.addEventListener('click', () => {
    if (index < 1) {
        index++;
        arrowLeft.classList.remove('disabled');
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft && arrowLeft.addEventListener('click', () => {
    if (index = 1) {
        index--;
        arrowRight.classList.remove('disabled');
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});

// Funcionalidad de zoom (lightbox) para imágenes del carrusel
function createLightbox() {
    if (document.getElementById('lightbox-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="" alt="Imagen ampliada" />
        </div>
    `;
    document.body.appendChild(modal);

    // Cerrar al hacer click en el fondo o en el botón
    modal.querySelector('.lightbox-backdrop').onclick = closeLightbox;
    modal.querySelector('.lightbox-close').onclick = closeLightbox;
    // Cerrar con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
}

function openLightbox(src) {
    createLightbox();
    const modal = document.getElementById('lightbox-modal');
    modal.querySelector('img').src = src;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 200);
    }
}

// Asignar evento a las imágenes del carrusel
const carouselImgs = document.querySelectorAll('.portfolio-carousel .img-item img');
carouselImgs.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src));
});

// Validaciones del formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const errorContainer = document.getElementById('form-errors');

    const campos = {
        nombre: { selector: 'input[name="nombre"]', minLength: 3, etiqueta: "Nombre" },
        email: { selector: 'input[name="email"]', regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, etiqueta: "Email" },
        telefono: { selector: 'input[name="telefono"]', regex: /^\d{7,}$/, etiqueta: "Teléfono" },
        asunto: { selector: 'input[name="asunto"]', minLength: 3, etiqueta: "Asunto" },
        mensaje: { selector: 'textarea[name="mensaje"]', minLength: 10, etiqueta: "Mensaje" }
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const errores = [];

        for (const campo in campos) {
            const { selector, minLength, regex, etiqueta } = campos[campo];
            const input = form.querySelector(selector);
            const valor = input.value.trim();

            const nombreCampo = etiqueta || campo;

            if (!valor) {
                errores.push(`• El campo <strong>${nombreCampo}</strong> no puede estar vacío.`);
                continue;
            }

            if (minLength && valor.length < minLength) {
                errores.push(`• El campo <strong>${nombreCampo}</strong> debe tener al menos ${minLength} caracteres.`);
            }

            if (regex && !regex.test(valor)) {
                errores.push(obtenerMensajeFormato(campo));
            }
        }

        mostrarErrores(errores, errorContainer);

        if (errores.length === 0) {
            form.submit();
        }
    });

    function obtenerMensajeFormato(campo) {
        switch (campo) {
            case 'email':
                return "• El campo <strong>Email</strong> no es válido.";
            case 'telefono':
                return "• El campo <strong>Teléfono</strong> debe contener solo números y al menos 7 dígitos.";
            default:
                return `• El campo <strong>${campo}</strong> tiene un formato inválido.`;
        }
    }

    function mostrarErrores(errores, container) {
        container.innerHTML = errores.map(err => `<p>${err}</p>`).join("");
        container.style.display = errores.length ? "block" : "none";
        container.classList.toggle("show", errores.length > 0);
    }
});

// Agregar funcionalidad traduccción
let currentLang = 'es';

document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    loadLanguage(currentLang);
    document.getElementById('lang-toggle').textContent = currentLang === 'es' ? 'EN' : 'ES';
});

function loadLanguage(lang) {
    fetch('lang/lang.json')
        .then(res => res.json())
        .then(data => {
            const elements = document.querySelectorAll('[data-i18n]');
            elements.forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (data[lang][key]) {
                    // Si el elemento tiene data-text (como el span animado), lo actualizamos con setAttribute
                    if (el.hasAttribute('data-text')) {
                        el.setAttribute('data-text', data[lang][key]);
                        el.textContent = data[lang][key]; // opcional, si quieres que también cambie el texto visible
                    } else {
                        el.textContent = data[lang][key];
                    }
                }
            });
        });
}
