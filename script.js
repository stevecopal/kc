(function() {
    // Éléments du DOM
    const header = document.getElementById('mainHeader');
    const headerLogo = document.getElementById('headerLogo');
    const desktopNav = document.getElementById('desktopNav');
    const menuBtn = document.getElementById('mobileMenuBtn');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;
    const links = document.querySelectorAll('.mobile-link');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const extraPhotos = document.getElementById('extra-photos');

    function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // Cacher toutes les images
        slides.forEach(slide => slide.style.opacity = '0');
        dots.forEach(dot => {
            dot.classList.remove('bg-gold');
            dot.classList.add('bg-transparent', 'border-white');
        });

        // Afficher l'image active
        slides[index].style.opacity = '1';
        dots[index].classList.add('bg-gold');
        dots[index].classList.remove('bg-transparent', 'border-white');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Changer d'image toutes les 5 secondes
    setInterval(nextSlide, 5000);
}

// Appeler la fonction au chargement
document.addEventListener('DOMContentLoaded', initHeroSlider);




    // 1. Fonction Toggle Menu
    function toggleMenu() {
        menuBtn.classList.toggle('is-active');
        overlay.classList.toggle('translate-x-full');
        overlay.classList.toggle('open');
        body.classList.toggle('overflow-hidden');
        
        // Si on ouvre le menu alors qu'on est en haut de page, on force le texte en blanc
        if (overlay.classList.contains('open')) {
            menuBtn.classList.add('text-white');
        } else if (window.scrollY > 80) {
            // Si on ferme et qu'on est scrollé, on remet le burger en noir
            menuBtn.classList.remove('text-white');
            menuBtn.classList.add('text-anthracite');
        }
    }

    if (menuBtn && overlay) {
        menuBtn.addEventListener('click', toggleMenu);

        // Fermer le menu au clic sur un lien
        links.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // 2. Gestion du Scroll (Header Transparent -> Blanc)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('bg-white', 'shadow-xl', 'py-2');
            header.classList.remove('py-4');
            
            if (headerLogo) {
                headerLogo.classList.replace('text-white', 'text-anthracite');
            }
            
            if (desktopNav) {
                desktopNav.classList.replace('text-white', 'text-anthracite');
            }
            
            if (menuBtn && !overlay.classList.contains('open')) {
                menuBtn.classList.replace('text-white', 'text-anthracite');
            }
        } else {
            header.classList.remove('bg-white', 'shadow-xl', 'py-2');
            header.classList.add('py-4');
            
            if (headerLogo) {
                headerLogo.classList.replace('text-anthracite', 'text-white');
            }
            
            if (desktopNav) {
                desktopNav.classList.replace('text-anthracite', 'text-white');
            }
            
            if (menuBtn) {
                menuBtn.classList.replace('text-anthracite', 'text-white');
            }
        }
    });

    // 3. Reveal Animation (Intersection Observer)
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    reveals.forEach(r => observer.observe(r));

    // 4. Gestion du bouton "Voir Plus" pour la galerie
    if (loadMoreBtn && extraPhotos) {
        loadMoreBtn.addEventListener('click', () => {
            extraPhotos.classList.toggle('hidden');
            if (extraPhotos.classList.contains('hidden')) {
                loadMoreBtn.innerHTML = '<i class="fas fa-th-large mr-2"></i> VOIR PLUS DE PHOTOS';
            } else {
                loadMoreBtn.innerHTML = '<i class="fas fa-minus mr-2"></i> VOIR MOINS';
            }
        });
    }

    // 5. Gestion du formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('✅ Merci ! Votre demande a été envoyée. Nous vous répondrons sous 24h.');
            contactForm.reset();
        });
    }

    // 6. Lissage défilement pour ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 7. Initialisation PhotoSwipe
    if (typeof PhotoSwipeLightbox !== 'undefined') {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#my-gallery',
            children: 'a',
            pswpModule: PhotoSwipe,
            padding: { top: 30, bottom: 30, left: 20, right: 20 }
        });
        
        // Ajout de l'option de téléchargement
        lightbox.on('uiRegister', function() {
            lightbox.pswp.ui.registerElement({
                name: 'download-button',
                order: 8,
                isButton: true,
                tagName: 'a',
                html: '<i class="fas fa-download" style="line-height:60px; font-size:20px; color:white;"></i>',
                onInit: (el, pswp) => {
                    el.setAttribute('download', '');
                    el.setAttribute('target', '_blank');
                    pswp.on('change', () => {
                        el.href = pswp.currSlide.data.src;
                    });
                }
            });
        });
        
        lightbox.init();
    }

    // 8. État initial au chargement
    if (window.scrollY > 80) {
        header.classList.add('bg-white', 'shadow-xl', 'py-2');
        header.classList.remove('py-4');
        headerLogo.classList.replace('text-white', 'text-anthracite');
        desktopNav.classList.replace('text-white', 'text-anthracite');
        menuBtn.classList.replace('text-white', 'text-anthracite');
    }
})();