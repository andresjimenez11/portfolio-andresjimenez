// Nav
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');

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

    sections.forEach(section => {
        section.classList.remove('active');
    });
} 

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if(!link.classList.contains('active')) {
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