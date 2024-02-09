import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import caratula from "../src/assets/caratula.jpg";
import appleIcon from "../src/assets/apple.png";
import spotifyIcon from "../src/assets/spotify.png";
import amazonIcon from "../src/assets/amazon.png";
import ivooxIcon from "../src/assets/ivoox.png";
import xIcon from "../src/assets/x.png";
import mailIcon from "../src/assets/mail.png";
import telegramIcon from "../src/assets/telegram.png";

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
          <h2>
            Explora el futuro digital con The Command Show 🎙️, donde <a href="https://twitter.com/lvrpiz" target="_blank" rel="noopener noreferrer">Álvaro García </a>
            y <a href="https://twitter.com/samuclr91" target="_blank" rel="noopener noreferrer">Samuel Rodríguez</a> te sumergen en la vanguardia de Apple, tecnología, la
            innovación y las últimas tendencias digitales.
          </h2>
          <h3>Únete a la comunidad 👇🏼</h3>
          <div className="buttons-container">
          <a
              href="https://t.me/ghostcoreapple"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img src={telegramIcon} alt="Telegram app Icon" />
                Únete a nuestra Comunidad
              </button>
            </a>
            <a
              href="https://command.beehiiv.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img src={mailIcon} alt="Newsletter Icon" />
                Newsletter (Coming soon...)
              </button>
            </a>
          </div>
          <h3>Suscríbete en tu plataforma favorita</h3>
          <div className="buttons-container">
          <a
              href="https://twitter.com/ghostcoreapple"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img src={xIcon} alt="X app Icon" />
                Follow on X
              </button>
            </a>
            <a
              href="https://podcasts.apple.com/es/podcast/the-command-show/id1705378048"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img src={appleIcon} alt="Apple Podcasts Icon" />
                Apple Podcasts
              </button>
            </a>
            <a
              href="https://open.spotify.com/show/2RgfLLM8bsFjHHhlkyEOJW?si=af1e628d90ca4f59"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img src={spotifyIcon} alt="Spotify Icon" />
                Spotify
              </button>
            </a>
            <a
              href="https://www.ivoox.com/podcast-the-command-show_sq_f12255193_1.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img src={ivooxIcon} alt="iVoox icon" />
                iVoox
              </button>
            </a>
          </div>
        </div>
      </div>
      <h3 className="tituloEpisodios">Últimos episodios</h3>
      <div className="episodes-container">
        {episodes.map((episode, index) => (
          <div key={index} className="episode-card">
            <h2>{episode.title}</h2>
            {/* <a href={episode.link} className="enlaceEpisodio">
              Escuchar episodio
            </a> */}
            <div className="icons-container">
              <a
                href="https://open.spotify.com/show/2RgfLLM8bsFjHHhlkyEOJW?si=af1e628d90ca4f59"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="icon" src={spotifyIcon} alt="Spotify Icon" />
              </a>
              <a
                href="https://podcasts.apple.com/es/podcast/the-command-show/id1705378048"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="icon"
                  src={appleIcon}
                  alt="Apple Podcasts Icon"
                />
              </a>
              <a
                href="https://www.ivoox.com/podcast-the-command-show_sq_f12255193_1.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="icon" src={ivooxIcon} alt="iVoox Icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
