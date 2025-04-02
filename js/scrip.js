window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 50);
});

document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll('.trailer-video');

    videos.forEach(video => {
        let fadeInterval;
        let delayTimeout;

        const fadeVolume = (targetVolume, callback) => {
            clearInterval(fadeInterval);
            fadeInterval = setInterval(() => {
                const currentVolume = video.volume;
                const step = 0.05;

                if (Math.abs(currentVolume - targetVolume) <= step) {
                    video.volume = targetVolume;
                    clearInterval(fadeInterval);
                    if (callback) callback();
                    return;
                }

                video.volume += (currentVolume < targetVolume) ? step : -step;
                video.volume = Math.min(Math.max(video.volume, 0), 1);
            }, 100);
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clearTimeout(delayTimeout); // hủy bất kỳ timeout trước đó
                    delayTimeout = setTimeout(() => {
                        video.volume = 0;
                        video.play().catch(err => console.log("Autoplay error:", err));
                        fadeVolume(1);
                    }, 500); // Chờ 1 giây
                } else {
                    clearTimeout(delayTimeout); // hủy nếu người dùng lăn ra ngoài trước 1s
                    fadeVolume(0, () => video.pause());
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(video);
    });
});
