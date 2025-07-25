let index = 0;

export function setupCarousel() {
    const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

    function activePortfolio() {
        const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
        const portfolioDetails = document.querySelectorAll('.portfolio-detail');

        if (!imgSlide) return;
        imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

        portfolioDetails.forEach(detail => detail.classList.remove('active'));
        portfolioDetails[index].classList.add('active');
    }

    arrowRight?.addEventListener('click', () => {
        if (index < 1) {
            index++;
            arrowLeft.classList.remove('disabled');
            arrowRight.classList.add('disabled');
        }
        activePortfolio();
    });

    arrowLeft?.addEventListener('click', () => {
        if (index === 1) {
            index--;
            arrowRight.classList.remove('disabled');
            arrowLeft.classList.add('disabled');
        }
        activePortfolio();
    });

    activePortfolio();
}
