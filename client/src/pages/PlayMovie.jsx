import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';


export default function PlayMovie() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const movieUrl = params.get('movieUrl');

  useEffect(() => {
    const player = new Plyr('#player');

    player.on('ready', event => {
        player.play();
    });
    const playerElement = document.getElementById('player');
    playerElement.requestFullscreen();

    return () => {
        player.destroy(); 
      };
    }, [movieUrl]);

  return (
    <div className='py-10'>
      {movieUrl ? (
        <div className="plyr__video-embed" id="player">
            <iframe src={movieUrl} allowFullScreen allow="autoplay"></iframe>
        </div>
      ) : (
        <p>Movie URL not found</p>
      )}
    </div>
  );
}
