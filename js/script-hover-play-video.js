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
        }, 150);
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
  