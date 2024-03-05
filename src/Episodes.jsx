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
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://itunes.apple.com/lookup?id=1705378048&country=US&media=podcast&entity=podcastEpisode&limit=5';
        axios.get(proxyUrl + targetUrl)
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
            <h2 className="podcastTitle">The Command Show</h2>
            <p className="podcastDescription">Tecnología, innovación, IA, Apple, iPhone y más
                En este podcast, Álvaro y Samuel te traen las últimas tendencias tecnológicas más importantes del momento con un foco en Apple.</p>
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