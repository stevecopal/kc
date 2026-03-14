(function() {
    // 1. Éléments du DOM (Sélecteurs sécurisés)
    const header = document.getElementById('mainHeader');
    const headerLogo = document.querySelector('.header-logo'); // Utilise la classe
    const desktopNav = document.getElementById('desktopNav');
    const menuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;
    const links = document.querySelectorAll('.mobile-link');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const extraPhotos = document.getElementById('extra-photos');

    // 2. Gestion du Slider Hero
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        if (slides.length === 0) return; // Sécurité si pas de slides

        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.opacity = (i === index) ? '1' : '0';
            });
            
            // Mise à jour des points si ils existent
            if (dots.length > 0) {
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('bg-gold');
                        dot.classList.remove('bg-transparent', 'border-white');
                    } else {
                        dot.classList.remove('bg-gold');
                        dot.classList.add('bg-transparent', 'border-white');
                    }
                });
            }
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // 3. Fonction Toggle Menu Mobile
    function toggleMenu() {
        if (!menuBtn || !overlay) return;
        menuBtn.classList.toggle('is-active');
        overlay.classList.toggle('translate-x-full');
        overlay.classList.toggle('open');
        body.classList.toggle('overflow-hidden');
        
        if (overlay.classList.contains('open')) {
            menuBtn.classList.add('text-white');
        } else if (window.scrollY > 80) {
            menuBtn.classList.remove('text-white');
            menuBtn.classList.add('text-anthracite');
        }
    }

    // 4. Gestion du Scroll (Header Transparent -> Blanc)
    function handleScroll() {
        if (!header) return;
        
        if (window.scrollY > 80) {
            header.classList.add('bg-white', 'shadow-xl', 'py-2');
            header.classList.remove('py-4');
            
            if (headerLogo) headerLogo.classList.replace('text-white', 'text-anthracite');
            if (desktopNav) desktopNav.classList.replace('text-white', 'text-anthracite');
            if (menuBtn && !overlay?.classList.contains('open')) {
                menuBtn.classList.add('text-anthracite');
                menuBtn.classList.remove('text-white');
            }
        } else {
            header.classList.remove('bg-white', 'shadow-xl', 'py-2');
            header.classList.add('py-4');
            
            if (headerLogo) headerLogo.classList.replace('text-anthracite', 'text-white');
            if (desktopNav) desktopNav.classList.replace('text-anthracite', 'text-white');
            if (menuBtn) {
                menuBtn.classList.add('text-white');
                menuBtn.classList.remove('text-anthracite');
            }
        }
    }

    // 5. Initialisation au chargement du DOM
    document.addEventListener('DOMContentLoaded', () => {
        // Lancer le slider
        initHeroSlider();

        // Écouteur de scroll
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // État initial

        // Menu Mobile
        if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
        links.forEach(link => link.addEventListener('click', toggleMenu));

        // Reveal Animation
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        reveals.forEach(r => observer.observe(r));

        // Galerie Voir Plus
        if (loadMoreBtn && extraPhotos) {
            loadMoreBtn.addEventListener('click', () => {
                extraPhotos.classList.toggle('hidden');
                loadMoreBtn.innerHTML = extraPhotos.classList.contains('hidden') ? 
                    '<i class="fas fa-th-large mr-2"></i> VOIR PLUS' : 
                    '<i class="fas fa-minus mr-2"></i> VOIR MOINS';
            });
        }

        // Formulaire
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('✅ Demande envoyée ! Nous vous répondrons très vite.');
                contactForm.reset();
            });
        }

        // PhotoSwipe (Uniquement si chargé)
        if (typeof PhotoSwipeLightbox !== 'undefined') {
            const lightbox = new PhotoSwipeLightbox({
                gallery: '#my-gallery',
                children: 'a',
                pswpModule: PhotoSwipe
            });
            lightbox.init();
        }
    });

})();