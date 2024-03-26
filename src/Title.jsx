import React from 'react';
import './styles/Title.css';

const Title = () => {
    return (
        <div className='firstContainer'>
            <div className='titleSpace'>
                <h1>The <br></br> Command
                <br></br><span className="showTitle">show</span><span className="emoji">🎙️ &</span>
                <br></br><span className='newsletterTitle'>newsletter </span><span className="emoji">📨</span></h1>
            </div>

            <div className='newsSpace'>
                <h3 className="tituloNewsletter">👨🏻‍💻 Mantente al día de la tecnología en 5 minutos</h3>
                <p className="descripcionNewsletter">¡Recibe un email semanal gratuito con las historias más interesantes en el mundo tech 📱, IA 🧠 e Innovación 💡</p>
                <iframe src="https://embeds.beehiiv.com/de9ab7fa-3e6f-4a25-a34d-36d163000b93?slim=true" data-test-id="beehiiv-embed" height="120" frameBorder="0" scrolling="no" style={{margin: 0, borderRadius: '0px', backgroundColor: 'transparent'}}></iframe>
            </div>
        </div>

        
    );
};

export default Title;