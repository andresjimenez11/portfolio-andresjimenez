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
    link.addEventListener('click', () => {
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

logoLink.addEventListener('click', () => {
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
    if (index < 2) {
        index++;
        arrowLeft.classList.remove('disabled');
    } else {
        index = 3;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft && arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    } else {
        index = 0;
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

// Validaciones formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que se envíe el formulario

        const nombre = form.querySelector('input[placeholder="Nombre completo"]');
        const email = form.querySelector('input[placeholder="Email"]');
        const telefono = form.querySelector('input[placeholder="Teléfono"]');
        const asunto = form.querySelector('input[placeholder="Asunto"]');
        const mensaje = form.querySelector('textarea');

        let errores = [];

        // Validación básica
        if (nombre.value.trim().length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            errores.push("El correo electrónico no es válido.");
        }

        if (!/^[0-9]{7,}$/.test(telefono.value)) {
            errores.push("El teléfono debe contener al menos 7 dígitos.");
        }

        if (asunto.value.trim().length < 3) {
            errores.push("El asunto es muy corto.");
        }

        if (mensaje.value.trim().length < 10) {
            errores.push("El mensaje debe tener al menos 10 caracteres.");
        }

        if (errores.length > 0) {
            alert("Corrige los siguientes errores:\n\n" + errores.join("\n"));
        } else {
            form.reset(); // Limpia los campos
        }
    });
});