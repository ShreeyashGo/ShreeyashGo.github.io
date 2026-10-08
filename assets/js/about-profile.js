document.addEventListener('DOMContentLoaded', function() {
    /* COURSEWORK TOGGLE */
    var courseBtn = document.getElementById('elective-toggle');
    var courseContainer = document.getElementById('elective-container');
    if (courseBtn && courseContainer) {
        courseBtn.addEventListener('click', function() {
            if (courseContainer.classList.contains('expanded')) {
                courseContainer.classList.remove('expanded');
                this.innerHTML = "View All Coursework ↓";
                var header = document.getElementById('electives');
                if(header) header.scrollIntoView({ behavior: 'smooth' });
            } else {
                courseContainer.classList.add('expanded');
                this.innerHTML = "Show Less ↑";
            }
        });
    }

    /* EXPERIENCE TOGGLE */
    var expBtn = document.getElementById('btn-exp');
    var expContent = document.getElementById('hidden-experience');
    if (expBtn && expContent) {
        expBtn.addEventListener('click', function() {
            /* Check computed style to handle hidden elements robustly */
            if (window.getComputedStyle(expContent).display !== 'none') {
                expContent.style.display = 'none';
                this.innerHTML = 'View Full Experience ↓';
            } else {
                expContent.style.display = 'block';
                this.innerHTML = 'Show Less ↑';
            }
        });
    }

    /* TEACHING TOGGLE */
    var teachBtn = document.getElementById('btn-teach');
    var teachContent = document.getElementById('hidden-teaching');
    if (teachBtn && teachContent) {
        teachBtn.addEventListener('click', function() {
            if (window.getComputedStyle(teachContent).display !== 'none') {
                teachContent.style.display = 'none';
                this.innerHTML = 'View More Teaching ↓';
            } else {
                teachContent.style.display = 'grid';
                this.innerHTML = 'Show Less ↑';
            }
        });
    }
});
