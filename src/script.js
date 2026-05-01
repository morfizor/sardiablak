document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Scroll Reveal Animation Logic (Optimized with Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Check if the element is part of a grid for staggered animation
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('product-grid') || 
                               parent.classList.contains('gallery') || 
                               parent.classList.contains('masonry-grid') ||
                               parent.classList.contains('features-grid'))) {
                    
                    // Get all revealable children of this parent
                    const siblings = Array.from(parent.querySelectorAll('.reveal, .reveal-left, .reveal-right'));
                    const index = siblings.indexOf(entry.target);
                    
                    // Apply delay based on index
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }

                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Contact Form AJAX Submission ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            submitBtn.disabled = true;
            submitBtn.textContent = 'Küldés...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#28a745';
                    formStatus.textContent = 'Köszönjük! Üzenetét sikeresen elküldtük. Hamarosan jelentkezünk.';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = "Hiba történt az üzenet küldésekor. Kérjük, próbálja újra később.";
                    }
                    formStatus.style.display = 'block';
                    formStatus.style.color = '#dc3545';
                }
            } catch (error) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#dc3545';
                formStatus.textContent = 'Hálózati hiba történt. Kérjük, ellenőrizze internetkapcsolatát.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Üzenet Küldése';
            }
        });
    }
});
