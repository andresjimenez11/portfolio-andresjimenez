export function setupLightbox() {
    const carouselImgs = document.querySelectorAll('.portfolio-carousel .img-item img');

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

        modal.querySelector('.lightbox-backdrop').onclick = closeLightbox;
        modal.querySelector('.lightbox-close').onclick = closeLightbox;
        document.addEventListener('keydown', e => {
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

    carouselImgs.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => openLightbox(img.src));
    });
}
