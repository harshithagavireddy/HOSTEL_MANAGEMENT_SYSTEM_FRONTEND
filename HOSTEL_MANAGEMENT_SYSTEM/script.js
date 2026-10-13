document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Navbar Color Shifting on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Active Link Highlighter on Scroll Track
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Intersection Observer (Scroll-Reveal Controller)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation-active flag class
                entry.target.classList.add('active');
                // Unobserve once element is shown to clean performance pipelines
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,          // Track viewport context bounds
        threshold: 0.15,     // Trigger when 15% of target structural card is visible
        rootMargin: "0px"
    });

    // Gather and register all targeted elements
    const elementsToReveal = document.querySelectorAll('.scroll-reveal');
    elementsToReveal.forEach(el => revealObserver.observe(el));

    // 4. Form Submission Interceptor 
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message shifted successfully and the hostel team will contact you shortly.');
        form.reset();
    });
});