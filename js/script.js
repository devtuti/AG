  <script>
        // Loading Screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 1500);
        });

        // Navbar scroll effect
        const navbar = document.getElementById('mainNav');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open
                    const navCollapse = document.getElementById('navbarNav');
                    if (navCollapse.classList.contains('show')) {
                        new bootstrap.Collapse(navCollapse).hide();
                    }
                }
            });
        });

        // Mobile bottom nav active state
        const mobileNavItems = document.querySelectorAll('.nav-item-mobile');
        const sections = document.querySelectorAll('section[id]');

        function updateMobileNav() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === current) {
                    item.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateMobileNav);

        // Scroll animations
        const fadeElements = document.querySelectorAll('.fade-in-up');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));

        // Phone mask
        const phoneInput = document.getElementById('clientPhone');
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                let formatted = '+7';
                if (value.length > 0) formatted += ' (' + value.substring(0, 3);
                if (value.length >= 3) formatted += ') ' + value.substring(3, 6);
                if (value.length >= 6) formatted += '-' + value.substring(6, 8);
                if (value.length >= 8) formatted += '-' + value.substring(8, 10);
                e.target.value = formatted;
            }
        });

        // Set minimum date to today
        const dateInput = document.getElementById('clientDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

        // Form submission
        const bookingForm = document.getElementById('bookingForm');
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Collect form data
            const formData = {
                name: document.getElementById('clientName').value,
                phone: document.getElementById('clientPhone').value,
                service: document.getElementById('clientService').value,
                date: document.getElementById('clientDate').value,
                time: document.getElementById('clientTime').value,
                contact: document.getElementById('clientContact').value,
                comment: document.getElementById('clientComment').value
            };

            console.log('Booking data:', formData);

            // Show success modal
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Reset form
            this.reset();
            this.classList.remove('was-validated');
        });

        // Parallax effect for hero particles
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = 0.1 + (index * 0.05);
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    </script>