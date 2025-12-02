   gsap.registerPlugin(ScrollTrigger);

        // Header animations
        gsap.from('.profile-img', {
            duration: 1,
            scale: 0,
            rotation: 360,
            ease: 'back.out(1.7)',
            delay: 0.2
        });

        gsap.from('.header h1', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.header .subtitle', {
            duration: 1,
            x: -100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.7
        });

        gsap.from('.header p', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.9
        });

        // Content cards animation on scroll
        gsap.utils.toArray('.content-card').forEach((card, index) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'top 50%',
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                },
                y: 100,
                opacity: 0
            });
        });

        // Highlight items animation
        gsap.utils.toArray('.highlight-item').forEach((item, index) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });

        // Skills animation
        gsap.utils.toArray('.skill-item').forEach((skill, index) => {
            gsap.to(skill, {
                scrollTrigger: {
                    trigger: skill,
                    start: 'top 85%'
                },
                scale: 1,
                opacity: 1,
                duration: 0.5,
                delay: index * 0.05,
                ease: 'back.out(1.7)'
            });
        });

        // Projects animation
        gsap.utils.toArray('.project-card').forEach((project, index) => {
            gsap.to(project, {
                scrollTrigger: {
                    trigger: project,
                    start: 'top 85%'
                },
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: 'power3.out'
            });
        });

        // Contact items animation
        gsap.utils.toArray('.contact-item').forEach((item, index) => {
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power3.out'
            });
        });

        // Hover animations for skills
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                gsap.to(skill, {
                    scale: 1.1,
                    backgroundColor: 'rgba(0, 255, 106, 0.2)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            skill.addEventListener('mouseleave', () => {
                gsap.to(skill, {
                    scale: 1,
                    backgroundColor: 'rgba(0, 255, 106, 0.1)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Hover animations for projects
        document.querySelectorAll('.project-card').forEach(project => {
            project.addEventListener('mouseenter', () => {
                gsap.to(project, {
                    x: 15,
                    backgroundColor: 'rgba(0, 217, 255, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            project.addEventListener('mouseleave', () => {
                gsap.to(project, {
                    x: 0,
                    backgroundColor: 'rgba(0, 217, 255, 0.05)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Contact items hover
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -10,
                    scale: 1.05,
                    backgroundColor: 'rgba(0, 255, 106, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    scale: 1,
                    backgroundColor: 'rgba(0, 255, 106, 0.05)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });