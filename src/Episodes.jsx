import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Episodes.css';
import TarjetaEpisodio from './TarjetaEpisodio';
import youtubeIcon from './assets/podcast-youtube-white.svg';
import spotifyIcon from './assets/spotify-logo.svg';
import appleIcon from './assets/apple-podcast-logo.svg';
import youtubeSQ from './assets/youtube-sq.png';
import spotifySQ from './assets/spotify-sq.png';
import appleSQ from './assets/apple-sq.png';

const Episodes = () => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        axios.get("https://lfzj8j2pm8.execute-api.eu-south-2.amazonaws.com/production/episodes")
            .then(response => {
                const episodesWithoutFirst = response.data.results.slice(1);
                setEpisodes(episodesWithoutFirst);
            })
            .catch(error => {
                console.error('Error fetching episodes', error);
            });
    }, []);

    return (
        <div className="episodesWrapper">
            <h2 className="podcastTitle">The Command show</h2>
            <p className="podcastDescription">Tecnología, innovación, IA, Apple, iPhone y más
                En este podcast, Álvaro y Samuel te traen las últimas tendencias tecnológicas más importantes del momento con un foco en Apple.
                 Puedes encontrarnos en todas las plataformas de audio como <a className='enlaceURL' href='https://podcasts.apple.com/es/podcast/the-command-show/id1705378048'>Apple Podcasts</a>, 
                 <a className='enlaceURL' href='https://open.spotify.com/show/2RgfLLM8bsFjHHhlkyEOJW?si=af1e628d90ca4f59'> Spotify</a>,
                 <a className='enlaceURL' href='https://music.amazon.es/podcasts/d53f7123-d537-4e1c-94a6-7d44809dd289/the-command-show'> Amazon Music</a>, 
                 <a className='enlaceURL' href='https://castbox.fm/channel/The-Command-Show-id5571515?country=es'> Castbox</a>,
                 <a className='enlaceURL' href='https://play.pocketcasts.com/web/podcasts/share?id=78482f90-79a9-013c-74ef-027201e7e97f'> Pocket Casts</a>,
                 <a className='enlaceURL' href='https://radiopublic.com/the-command-show-69MNm2'> Radio Public</a> y 
                 <a className='enlaceURL' href='https://www.youtube.com/@TheCommandShow'> YouTube</a>.</p>
            <div className="enlacesPodcast">
                <div className="desktop">
                    <a href="https://www.youtube.com/@TheCommandShow" target="_blank" rel="noopener noreferrer">
                        <img src={youtubeIcon} alt="YouTube Icon" />
                    </a>
                    <a href="https://open.spotify.com/show/2RgfLLM8bsFjHHhlkyEOJW?si=af1e628d90ca4f59" target="_blank" rel="noopener noreferrer">
                        <img src={spotifyIcon} alt="Spotify Icon" />
                    </a>
                    <a href="https://podcasts.apple.com/es/podcast/the-command-show/id1705378048" target="_blank" rel="noopener noreferrer">
                        <img src={appleIcon} alt="Apple Podcast Icon" />
                    </a>
                </div>
                <div className="mobile">
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
            <h3 className="episodesTitle">Últimos episodios</h3>
            {episodes.map(episode => (
                <TarjetaEpisodio episode={episode} />
            ))}
        </div>
    );
};

export default Episodes;