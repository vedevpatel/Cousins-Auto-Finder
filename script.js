// Sticky header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.sticky-header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation for sections
const fadeElems = document.querySelectorAll('.fade-in');

const fadeIn = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(fadeIn, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
});

fadeElems.forEach(elem => observer.observe(elem));

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});



// Handle form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch('submit_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = data.message;
        statusDiv.className = data.status;
        
        if (data.status === 'success') {
            this.reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = 'An error occurred. Please try again later.';
        statusDiv.className = 'error';
    });
});
