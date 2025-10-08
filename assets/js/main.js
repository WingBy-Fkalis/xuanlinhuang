// Minimal enhancements: prefers-reduced-motion, smooth anchor, viewport fixes
(function () {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        document.querySelectorAll('video[autoplay]').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });
    }

    // Smooth internal anchor scroll
    document.addEventListener('click', e => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Card hover effects and parallax
    document.addEventListener('DOMContentLoaded', function () {
        // Add parallax effect to hero card background
        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            heroCard.addEventListener('mousemove', function (e) {
                if (prefersReduced) return;

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                const bg = this.querySelector('.hero-card-bg');
                if (bg) {
                    bg.style.transform = `translate3d(${(x - centerX) / 40}px, ${(y - centerY) / 40}px, 0)`;
                }
            });

            heroCard.addEventListener('mouseleave', function () {
                const bg = this.querySelector('.hero-card-bg');
                if (bg) {
                    bg.style.transform = 'translate3d(0, 0, 0)';
                }
            });
        }

        // Add subtle parallax to secondary cards
        const secondaryCards = document.querySelectorAll('.secondary-card');
        secondaryCards.forEach(card => {
            card.addEventListener('mousemove', function (e) {
                if (prefersReduced) return;

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const bg = this.querySelector('.secondary-card-bg');
                if (bg) {
                    bg.style.transform = `translate3d(${(x - centerX) / 60}px, ${(y - centerY) / 60}px, 0)`;
                }
            });

            card.addEventListener('mouseleave', function () {
                const bg = this.querySelector('.secondary-card-bg');
                if (bg) {
                    bg.style.transform = 'translate3d(0, 0, 0)';
                }
            });
        });
    });
})();


