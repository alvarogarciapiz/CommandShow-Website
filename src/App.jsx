import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lfzj8j2pm8.execute-api.eu-south-2.amazonaws.com/production/episodes');
        setEpisodes(response.data);
      } catch (error) {
        console.error('Hubo un error al obtener los episodios:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>The Command Show Podcast</h1>
      {episodes.map((episode, index) => (
        <div key={index}>
          <h2>{episode.title}</h2>
          <p>{episode.published}</p>
          <a href={episode.link}>Escuchar episodio</a>
        </div>
      ))}
    </div>
  );
}

export default App;