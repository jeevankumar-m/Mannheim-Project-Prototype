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

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.cta-button');

    // 1. Split Text for Hero Title
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerHTML = text.split(' ').map((word, i) =>
            `<span class="word" style="transition-delay: ${i * 0.1}s">${word}</span>`
        ).join(' ');
    }

    // 2. Intro Animation Sequence
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

                // Trigger Hero Animations
                setTimeout(() => {
                    if (heroTitle) heroTitle.classList.add('animate');
                    if (heroSubtitle) heroSubtitle.classList.add('animate');
                    if (heroCta) heroCta.classList.add('animate');
                }, 500);

                setTimeout(() => {
                    introOverlay.style.display = 'none';
                }, 1500);
            }, 800);
        }, 300);
    }, 1000);

    // 3. View Switching Logic (Story Section)
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

    if (knowMoreBtn) knowMoreBtn.addEventListener('click', openKnowMore);
    if (showLessBtn) showLessBtn.addEventListener('click', closeKnowMore);

    // 4. Scroll Effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Hero Background Parallax
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
        if (knowMoreContent && knowMoreContent.classList.contains('active')) {
            const sectionRect = storySection.getBoundingClientRect();
            if (sectionRect.top > 300) {
                closeKnowMore();
            }
        }
    });
});
