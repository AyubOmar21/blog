// 1. Theme Observer Logic
const observerOptions = {
    threshold: 0.2, 
};

const themeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const newTheme = entry.target.getAttribute('data-era');
            document.body.classList.remove('theme-scramble', 'theme-present', 'theme-dark');
            document.body.classList.add(`theme-${newTheme}`);
        }
    });
}, observerOptions);

document.querySelectorAll('.era-zone').forEach(zone => {
    themeObserver.observe(zone);
});

// 2. Table of Contents (TOC) Logic
const toc = document.getElementById('main-toc');
const toggleBtn = document.getElementById('toc-toggle');
const header = document.querySelector('.blog-header');

window.addEventListener('scroll', () => {
    const stickyThreshold = header.offsetTop + header.offsetHeight;

    if (window.scrollY >= stickyThreshold) {
        toc.classList.add('is-stuck');
    } else {
        toc.classList.remove('is-stuck', 'is-expanded');
        toggleBtn.querySelector('span').innerText = '+';
    }
});

toggleBtn.addEventListener('click', () => {
    toc.classList.toggle('is-expanded');
    const isExpanded = toc.classList.contains('is-expanded');
    toggleBtn.querySelector('span').innerText = isExpanded ? '-' : '+';
});

// 3. UPDATED IMAGE MODAL LOGIC
const modal = document.getElementById('image-modal');
const fullImg = document.getElementById('full-image');

/* CHANGE: We now target images within the new landscape and portrait classes.
   Using a comma in the selector allows us to grab both types at once.
*/
document.querySelectorAll('.image-landscape img, .image-portrait img').forEach(img => {
    img.style.cursor = 'zoom-in';
    
    img.addEventListener('click', () => {
        modal.classList.add('active');
        fullImg.src = img.src; 
    });
});

// Close modal when clicking anywhere on it (background or 'X')
modal.addEventListener('click', () => {
    modal.classList.remove('active');
});



document.querySelectorAll('.carousel-container').forEach(carousel => {
    const slidesContainer = carousel.querySelector('.carousel-slides');
    const slides = carousel.querySelectorAll('.slide');
    const captionText = carousel.querySelector('.carousel-caption');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');

    let currentIndex = 0;

    function updateCarousel() {
        // 1. Slide Animation
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // 2. Caption Animation (Quick Fade Out/In)
        captionText.style.opacity = 0;
        
        setTimeout(() => {
            const newCaption = slides[currentIndex].getAttribute('data-caption');
            captionText.innerText = newCaption;
            captionText.style.opacity = 0.8;
        }, 200);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });
});

// Update the Lightbox/Modal to listen to these images too
document.querySelectorAll('.slide img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
        const modal = document.getElementById('image-modal');
        const fullImg = document.getElementById('full-image');
        modal.classList.add('active');
        fullImg.src = img.src;
    });
});