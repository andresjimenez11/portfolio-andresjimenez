export function setupResumeTabs() {
    const resumeBtns = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            resumeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resumeDetails.forEach(d => d.classList.remove('active'));
            resumeDetails[idx].classList.add('active');
        });
    });
}
