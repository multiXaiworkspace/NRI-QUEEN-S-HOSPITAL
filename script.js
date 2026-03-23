document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. Sticky Header Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Appointment Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get button to show loading state
            const submitBtn = appointmentForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Process the details and trigger native email client
            setTimeout(() => {
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const department = document.getElementById('department').value;
                const date = document.getElementById('date').value;
                
                const subject = encodeURIComponent(`New Appointment Request: ${name}`);
                const body = encodeURIComponent(`Hello Queen's NRI Hospital Team,\n\nI would like to book an appointment. My details are below:\n\nName: ${name}\nPhone: ${phone}\nDepartment: ${department || 'Not specified'}\nPreferred Date: ${date || 'Not specified'}\n\nPlease call me back to confirm my slot.\n\nThank you.`);
                
                // Triggers the default mail app with the pre-filled data
                window.location.href = `mailto:info@queensnri.com?subject=${subject}&body=${body}`;
                
                alert('Your device\'s email app will now open securely with your details. Please click "Send" to forward the message to the hospital staff.');
                appointmentForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 600);
        });
    }

    // 4. Smooth Scrolling for all Hash Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
