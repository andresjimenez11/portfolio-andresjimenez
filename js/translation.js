export function setupTranslation() {
    let currentLang = 'es';

    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        loadLanguage(currentLang);
        document.getElementById('lang-toggle').textContent = currentLang === 'es' ? 'ES' : 'EN';

        document.getElementById('es-flag').classList.toggle('active', currentLang === 'es');
        document.getElementById('en-flag').classList.toggle('active', currentLang === 'en');
    });

    function loadLanguage(lang) {
        fetch('lang/lang.json')
            .then(res => res.json())
            .then(data => {
                const elements = document.querySelectorAll('[data-i18n]');
                elements.forEach(el => {
                    const key = el.getAttribute('data-i18n');
                    if (data[lang][key]) {
                        if (el.hasAttribute('data-text')) {
                            el.setAttribute('data-text', data[lang][key]);
                        }
                        el.textContent = data[lang][key];
                    }
                });

                const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
                placeholders.forEach(el => {
                    const key = el.getAttribute('data-i18n-placeholder');
                    if (data[lang][key]) {
                        el.setAttribute('placeholder', data[lang][key]);
                    }
                });
            });
    }

    window.addEventListener('DOMContentLoaded', () => {
        document.getElementById('es-flag').classList.toggle('active', currentLang === 'es');
        document.getElementById('en-flag').classList.toggle('active', currentLang === 'en');
        document.getElementById('lang-toggle').textContent = currentLang === 'es' ? 'ES' : 'EN';
        loadLanguage(currentLang);
    });
}
