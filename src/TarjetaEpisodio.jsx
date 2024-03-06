import React from 'react';
import './styles/TarjetaEpisodio.css';
import youtubeSQ from './assets/youtube-sq.png';
import spotifySQ from './assets/spotify-sq.png';
import appleSQ from './assets/apple-sq.png';

const TarjetaEpisodio = ({ episode }) => {
    const description = episode.description.split("Si eres fan de la tecnología y la innovación")[0];

    return (
        <div key={episode.trackId} className="episodeCard">
            <img className="episodeImage" src={episode.artworkUrl600} alt={episode.trackName} />
            <div className="contentCard">
                <p className="episodeDate">{new Date(episode.releaseDate).toLocaleDateString()}</p>
                <h4 className="episodeTitle">
                    <a href={episode.trackViewUrl} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       style={{ textDecoration: 'none', color: 'inherit' }}>
                        {episode.trackName}
                    </a>
                </h4>
                <p className="episodeDescription">{description}</p>
                <div className="enlaces">
                    <a href="https://www.youtube.com/@TheCommandShow" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeSQ} alt="YouTube Icon" />
                    </a>
                    <a href="https://open.spotify.com/show/2RgfLLM8bsFjHHhlkyEOJW?si=af1e628d90ca4f59" target="_blank" rel="noopener noreferrer">
                        <img src={spotifySQ} alt="Spotify Icon" />
                    </a>
                    <a href="https://podcasts.apple.com/es/podcast/the-command-show/id1705378048" target="_blank" rel="noopener noreferrer">
                        <img src={appleSQ} alt="Apple Podcast Icon" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default TarjetaEpisodio;