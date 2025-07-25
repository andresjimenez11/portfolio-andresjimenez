export function setupNavigation() {
    const navLinks = document.querySelectorAll('header nav a');
    const logoLink = document.querySelector('.logo');
    const sections = document.querySelectorAll('section');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('header nav');
    const body = document.querySelector('body');

    function activePage() {
        const header = document.querySelector('header');
        const barsBox = document.querySelector('.bars-box');

        header.classList.remove('active');
        setTimeout(() => header.classList.add('active'), 1000);

        navLinks.forEach(link => link.classList.remove('active'));
        barsBox.classList.remove('active');
        setTimeout(() => barsBox.classList.add('active'), 650);
        setTimeout(() => body.classList.remove('active'), 1200);

        sections.forEach(section => section.classList.remove('active'));
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', e => {
            e.preventDefault();
            if (!link.classList.contains('active')) {
                body.classList.add('active');
                activePage();
                link.classList.add('active');
                setTimeout(() => sections[idx].classList.add('active'), 500);
            }
        });
    });

    logoLink.addEventListener('click', e => {
        e.preventDefault();
        if (!navLinks[0].classList.contains('active')) {
            body.classList.add('active');
            activePage();
            navLinks[0].classList.add('active');
            setTimeout(() => sections[0].classList.add('active'), 500);
        }
    });
}
