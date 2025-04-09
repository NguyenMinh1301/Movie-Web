document.addEventListener('DOMContentLoaded', () => {
    const movieBoxes = document.querySelectorAll('.movie-box');

    movieBoxes.forEach(movieBox => {
        const hoverCard = movieBox.querySelector('.hover-card');
        const iframe = hoverCard.querySelector('iframe');
        let hoverTimeout, playTimeout;

        movieBox.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                movieBox.classList.add('active');
                hoverCard.classList.add('active');

                playTimeout = setTimeout(() => {
                    const iframeWindow = iframe.contentWindow;
                    if (iframeWindow && iframeWindow.postMessage) {
                        iframe.classList.add('playing');
                        iframeWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    }
                }, 300);
            }, 600);
        });

        movieBox.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            clearTimeout(playTimeout);
            movieBox.classList.remove('active');
            hoverCard.classList.remove('active');
            iframe.classList.remove('playing');

            const iframeWindow = iframe.contentWindow;
            if (iframeWindow && iframeWindow.postMessage) {
                iframeWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const movieBoxes = document.querySelectorAll(".movie-box");

    movieBoxes.forEach((box) => {
        const iframe = box.querySelector("iframe");
        let player;
        let fadeInInterval, fadeOutInterval;

        const fadeInVolume = () => {
            let volume = 0;
            player.setVolume(0);
            clearInterval(fadeOutInterval);
            fadeInInterval = setInterval(() => {
                if (volume < 100) {
                    volume += 5;
                    player.setVolume(volume);
                } else {
                    clearInterval(fadeInInterval);
                }
            }, 500);
        };

        const fadeOutVolume = () => {
            clearInterval(fadeInInterval);
            let volume = player.getVolume();
            fadeOutInterval = setInterval(() => {
                if (volume > 0) {
                    volume -= 10;
                    player.setVolume(volume);
                } else {
                    clearInterval(fadeOutInterval);
                    player.pauseVideo();
                    player.seekTo(0);
                    player.mute();
                }
            }, 60);
        };

        const createPlayer = () => {
            player = new YT.Player(iframe, {
                events: {
                    onReady: () => {
                        box.addEventListener("mouseenter", () => {
                            player.unMute();
                            player.seekTo(0);
                            player.playVideo();
                            fadeInVolume();
                        });

                        box.addEventListener("mouseleave", () => {
                            fadeOutVolume();
                        });
                    }
                }
            });
        };

        if (window.YT && YT.Player) {
            createPlayer();
        } else {
            window.onYouTubeIframeAPIReady = createPlayer;
        }
    });
});
