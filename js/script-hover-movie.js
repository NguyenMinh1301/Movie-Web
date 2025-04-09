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
        }, 400);
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
  