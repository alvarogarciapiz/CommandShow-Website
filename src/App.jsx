import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import caratula from "../src/assets/caratula.jpg";
import appleIcon from "../src/assets/apple.png";
import spotifyIcon from "../src/assets/spotify.png";
import amazonIcon from "../src/assets/amazon.png";
import ivooxIcon from "../src/assets/ivoox.png";

function App() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lfzj8j2pm8.execute-api.eu-south-2.amazonaws.com/production/episodes"
        );
        setEpisodes(response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los episodios:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      <div className="podcast-container">
        <div className="image-container">
          <img src={caratula} alt="Podcast" />
        </div>
        <div className="content-container">
          <h1>The Command Show Podcast</h1>
          <h2>Sumérgete en el futuro digital con The Command Show, donde exploramos la vanguardia de la tecnología, la innovación y las últimas tendencias digitales.</h2>
          <h3>Suscríbete en tu plataforma favorita</h3>
          <div className="buttons-container">
            <a href="https://podcasts.apple.com/es/podcast/the-command-show/id1705378048" target="_blank" rel="noopener noreferrer">
              <button>
                <img src={appleIcon} alt="Apple Podcasts Icon" />
                Apple Podcasts
              </button>
            </a>
            <a href="https://open.spotify.com/show/2RgfLLM8bsFjHHhlkyEOJW?si=af1e628d90ca4f59" target="_blank" rel="noopener noreferrer">
              <button>
                <img src={spotifyIcon} alt="Spotify Icon" />
                Spotify
              </button>
            </a>
            <a href="https://www.ivoox.com/podcast-the-command-show_sq_f12255193_1.html" target="_blank" rel="noopener noreferrer">
              <button>
                <img src={ivooxIcon} alt="iVoox icon" />
                iVoox
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="episodes-container">
        {episodes.map((episode, index) => (
          <div key={index} className="episode-card">
            <h2>{episode.title}</h2>
            <a href={episode.link} className="enlaceEpisodio">Escuchar episodio</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
