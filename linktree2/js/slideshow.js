const images = document.querySelectorAll('.background-image');
let currentImageIndex = 0;

function showNextImage() {
    images[currentImageIndex].style.opacity = '0';
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].style.opacity = '1';
}

// Show first image immediately
images[0].style.opacity = '1';

// Start slideshow
setInterval(showNextImage, 6000); // 5 seconds display + 1 second transition