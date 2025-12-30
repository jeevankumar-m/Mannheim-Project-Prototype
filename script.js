document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introLogo = document.getElementById('intro-logo');
    const navbar = document.getElementById('main-nav');
    const navLogoTarget = document.getElementById('nav-logo-target');

    const knowMoreBtn = document.getElementById('know-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    const knowMoreContent = document.getElementById('know-more-content');
    const storyMain = document.getElementById('story-main');
    const storySection = document.getElementById('story');
    const storyImg = document.getElementById('story-img');

    // 1. Intro Animation
    setTimeout(() => {
        introLogo.classList.add('move-to-nav');
        setTimeout(() => {
            introOverlay.classList.add('animate-out');
            setTimeout(() => {
                navbar.classList.add('visible');
                const navLogo = document.createElement('img');
                navLogo.src = 'assets/logo.png';
                navLogo.alt = 'Mannheim Logo';
                navLogo.className = 'nav-logo';
                navLogoTarget.appendChild(navLogo);
                setTimeout(() => {
                    introOverlay.style.display = 'none';
                }, 1500);
            }, 800);
        }, 300);
    }, 1000);

    // 2. View Switching Logic
    const openKnowMore = () => {
        storyMain.classList.remove('active');
        setTimeout(() => {
            knowMoreContent.classList.add('active');
        }, 400);
    };

    const closeKnowMore = () => {
        knowMoreContent.classList.remove('active');
        setTimeout(() => {
            storyMain.classList.add('active');
        }, 400);
    };

    knowMoreBtn.addEventListener('click', openKnowMore);
    showLessBtn.addEventListener('click', closeKnowMore);

    // 3. Scroll Effects (Image Parallax & Auto-close)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero Parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }

        // Story Image Parallax
        if (storyImg) {
            const sectionRect = storySection.getBoundingClientRect();
            const sectionOffset = window.innerHeight - sectionRect.top;

            if (sectionOffset > 0 && sectionRect.bottom > 0) {
                const move = sectionOffset * 0.1;
                storyImg.style.transform = `translateY(${move}px)`;
            }
        }

        // Auto-close logic
        if (knowMoreContent.classList.contains('active')) {
            const sectionRect = storySection.getBoundingClientRect();
            // If user scrolls significantly above the section
            if (sectionRect.top > 300) {
                closeKnowMore();
            }
        }
    });
});
