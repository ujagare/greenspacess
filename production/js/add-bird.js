// Add bird image to all h1 headings
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('h1');
    headings.forEach(function(heading) {
        // Skip if already has bird image
        if (heading.querySelector('.heading-bird')) return;
        
        // Skip headings in carousel, facts section, and team section
        if (heading.closest('.carousel-caption') || 
            heading.closest('.facts') || 
            heading.closest('.team') ||
            heading.classList.contains('text-white') ||
            heading.getAttribute('data-toggle') === 'counter-up') {
            return;
        }
        
        // Create bird image element
        const birdImg = document.createElement('img');
        birdImg.src = 'img/Bird PNG.png';
        birdImg.alt = '';
        birdImg.className = 'heading-bird';
        
        // Insert bird at the beginning of heading
        heading.insertBefore(birdImg, heading.firstChild);
    });
});
