document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll('.trailer-video');

    videos.forEach(video => {
        let fadeInterval, delayTimeout;

        const fadeVolume = (target, callback) => {
            clearInterval(fadeInterval);
            fadeInterval = setInterval(() => {
                const step = 0.05;
                if (Math.abs(video.volume - target) <= step) {
                    video.volume = target;
                    clearInterval(fadeInterval);
                    if (callback) callback();
                } else {
                    video.volume += (video.volume < target ? step : -step);
                    video.volume = Math.max(0, Math.min(1, video.volume));
                }
            }, 100);
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                clearTimeout(delayTimeout);
                delayTimeout = setTimeout(() => {
                    video.volume = 0;
                    video.play().catch(err => console.error("Autoplay failed:", err));
                    fadeVolume(1);
                }, 500);
            } else {
                clearTimeout(delayTimeout);
                fadeVolume(0, () => video.pause());
            }
        }, { threshold: 0.5 });

        observer.observe(video);
    });
});

