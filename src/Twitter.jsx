import React from 'react';
import './styles/Twitter.css';
import logo from './assets/Logo-GC.png';
import instagram from './assets/instagram.png';
import x from './assets/x.png';
import telegram from './assets/telegram.png';

const Twitter = () => {

    return (
        <div className="TwitterWrapperB">
            <h2 className="TwitterTitleB"><img src={logo} alt="GhostCoreTech logo" />The Commmand</h2>
            <p className="TwitterDescriptionB">The Command Show y The Command Newsletter nacen de la mano de @TheCommmand, un medio de Noticias 📰, consejos, rumores y opinión sobre Tecnología, Apple, IA e Innovación. <a  className="enlaceTWW" href="https://twitter.com/ghostcoreapple">@GhostcoreApple </a>es tu lugar para estar al día de la actualidad de Apple en español.</p>

            <div className="enlacesPodcast">
                <div className="desktop desktopMedia">
                    <a href="https://www.instagram.com/thecommmand/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram Icon" />
                    </a>
                    <a href="https://x.com/TheCommmand" target="_blank" rel="noopener noreferrer">
                        <img src={x} alt="Twitter X Icon" />
                    </a>
                    <a href="https://t.me/ghostcoreapple" target="_blank" rel="noopener noreferrer">
                        <img src={telegram} alt="telegram Icon" />
                    </a>
                </div>
                <div className="mobile">
                    <a href="https://www.instagram.com/thecommmand/" target="_blank" rel="noopener noreferrer">
                        <img src={instagram} alt="Instagram Icon" />
                    </a>
                    <a href="https://x.com/TheCommmand" target="_blank" rel="noopener noreferrer">
                        <img src={x} alt="Twitter X Icon" />
                    </a>
                    <a href="https://t.me/ghostcoreapple" target="_blank" rel="noopener noreferrer">
                        <img src={telegram} alt="telegram Icon" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Twitter;