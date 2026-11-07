/* Keep these functions global for the gallery's lightbox interactions. */
window.openLightbox = function(imageSrc, imageAlt, title, story) {
    var lightbox = document.getElementById('lightbox');
    var img = document.getElementById('lightbox-img');

    img.src = imageSrc;
    img.alt = imageAlt || '';
    document.getElementById('lightbox-title').textContent = title || 'Photograph';
    var paragraph = document.getElementById('lightbox-story');
    paragraph.textContent = story || '';
    paragraph.hidden = !story;
    var storyPanel = document.getElementById('lightbox-story-panel');
    storyPanel.hidden = !story;
    storyPanel.open = !window.matchMedia('(max-width: 650px)').matches;
    if (!lightbox.open) lightbox.showModal();
};

window.closeLightbox = function() {
    var lightbox = document.getElementById('lightbox');
    lightbox.close();
};

(function() {
    function protectImage(event) {
        alert('Copyright Protected: Please contact me for image use!!');
        event.preventDefault();
    }

    document.querySelectorAll('.gallery-item').forEach(function(card) {
        function openPhoto() {
            window.openLightbox(card.dataset.lightboxSrc, card.querySelector('img').alt,
                card.dataset.lightboxTitle, card.dataset.lightboxStory);
        }
        card.addEventListener('click', openPhoto);
        card.addEventListener('keydown', function(event) {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            openPhoto();
        });
        card.querySelector('img').addEventListener('contextmenu', protectImage);
    });

    var lightbox = document.getElementById('lightbox');
    window.matchMedia('(max-width: 650px)').addEventListener('change', function(event) {
        if (lightbox.open) document.getElementById('lightbox-story-panel').open = !event.matches;
    });
    document.getElementById('lightbox-close').addEventListener('click', window.closeLightbox);
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) window.closeLightbox();
    });
    lightbox.addEventListener('close', function() {
        document.getElementById('lightbox-img').removeAttribute('src');
    });
    document.getElementById('lightbox-shield').addEventListener('contextmenu', protectImage);
})();
