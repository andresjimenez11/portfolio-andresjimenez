import { setupNavigation } from './nav.js';
import { setupResumeTabs } from './resume.js';
import { setupCarousel } from './carousel.js';
import { setupLightbox } from './lightbox.js';
import { setupFormValidation } from './formValidation.js';
import { setupTranslation } from './translation.js';

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupResumeTabs();
    setupCarousel();
    setupLightbox();
    setupFormValidation();
    setupTranslation();
});
