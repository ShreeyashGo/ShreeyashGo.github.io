/* Keep these functions global for the gallery's lightbox interactions. */
window.openLightbox = function(imageSrc, imageAlt) {
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');

    img.src = imageSrc;
    img.alt = imageAlt || '';
    lightbox.style.display = 'flex';
};

window.closeLightbox = function() {
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');

    lightbox.style.display = 'none';
    // Clear the source to prevent the old image flashing next time.
    setTimeout(function() { img.src = ''; }, 200);
};

(function() {
    function protectImage(event) {
        alert('Copyright Protected: Please contact me for image use!!');
        event.preventDefault();
    }

    document.querySelectorAll('.gallery-item').forEach(function(card) {
        card.addEventListener('click', function() {
            window.openLightbox(card.getAttribute('data-lightbox-src'), card.querySelector('img').alt);
        });
        card.querySelector('img').addEventListener('contextmenu', protectImage);
    });

    document.getElementById('lightbox').addEventListener('click', function() {
        window.closeLightbox();
    });
    document.getElementById('lightbox-container').addEventListener('click', function(event) {
        event.stopPropagation();
    });
    document.getElementById('lightbox-shield').addEventListener('contextmenu', protectImage);
})();
