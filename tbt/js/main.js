// TBT Boxing - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Contador animado de estadísticas
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Observador para animar cuando sea visible
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Smooth scroll para los links de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de las tarjetas de donación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.classList.contains('featured') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación inicial a las tarjetas
    document.querySelectorAll('.donation-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Efecto parallax en el hero
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Navbar con fondo al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.position = 'fixed';
            navbar.style.borderBottom = '2px solid #6f0000';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.position = 'absolute';
            navbar.style.borderBottom = 'none';
        }
    });

    // Efecto de hover en los botones de donación
    document.querySelectorAll('.btn-donate').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 0 #6f0000';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    console.log('🥊 TBT Boxing - Cargado correctamente');
});
