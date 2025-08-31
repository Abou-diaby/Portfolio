// Code JavaScript nettoyé et modulable

document.addEventListener('DOMContentLoaded', function () {
    // Une seule carte active à la fois dans toutes les sections
    document.querySelectorAll('.design-card').forEach(card => {
        card.addEventListener('click', function () {
            document.querySelectorAll('.design-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Bouton de bascule du menu mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenuContainer = document.querySelector('.navbar-menu-container');
    const socialMediaContainer = document.querySelector('.social-media-container');
    if (menuToggle && navbarMenuContainer && socialMediaContainer) {
        menuToggle.addEventListener('click', function () {
            navbarMenuContainer.classList.toggle('active');
            socialMediaContainer.classList.toggle('active');
        });
    }

    // Détection de la section visible pour activer le lien de navigation correspondant
    const navLinks = document.querySelectorAll('.navbar-menu li a');
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute('href')));

    // Version améliorée du "scroll spy" pour activer le lien de navigation en fonction de la position
    function improvedSetActiveLink() {
        let closestIndex = 0;
        let minDistance = Infinity;
        sections.forEach((section, i) => {
            if (!section) return;
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top - 80); // Décalage de 80px pour l'en-tête
            if (rect.top <= 100 && distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        });
        navLinks.forEach((link, i) => {
            if (i === closestIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    window.addEventListener('scroll', improvedSetActiveLink);
    improvedSetActiveLink(); // Appel initial
    // Mise à jour aussi au clic pour un retour visuel immédiat
    navLinks.forEach((link, i) => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animation du message de bienvenue
    if (window.anime) {
        const greetingText = document.getElementById('greetingText');
        const greetings = [
            'Stay safe from cyber',
            'Restez en sécurité contre le cyber',
        ];
        let greetIndex = 0;
        function animateGreeting(text) {
            greetingText.innerHTML = '';
            const words = text.split(' ');
            words.forEach((word, i) => {
                const span = document.createElement('span');
                span.className = 'greet-word';
                span.textContent = word;
                greetingText.appendChild(span);
                if (i < words.length - 1) {
                    greetingText.appendChild(document.createTextNode(' '));
                }
            });
            anime({
                targets: '#greetingText span',
                opacity: [0, 1],
                translateX: function(el, i) {
                    return i % 2 === 0 ? ['-2.5em', '0em'] : ['2.5em', '0em'];
                },
                duration: 800,
                delay: (_, i) => i * 100,
                easing: 'easeOutExpo',
                complete: () => {
                    greetIndex = (greetIndex + 1) % greetings.length;
                    setTimeout(() => animateGreeting(greetings[greetIndex]), 2000);
                }
            });
        }
        animateGreeting(greetings[greetIndex]);
    }
});
