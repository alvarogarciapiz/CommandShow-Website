import React from 'react';
import './styles/Ghostcoreapple.css';

const Ghostcoreapple = () => {

    return (
        <div className="GhostcoreappleWrapper">
            <span><a className="textGCA">🚀 Powered by </a>     
                <a href="https://twitter.com/ghostcoreapple" target="_blank" rel="noopener noreferrer">
                    <button className="GhostcoreappleButton">@ghostcoreapple</button>
                </a>
            </span>
        </div>
    );
};

export default Ghostcoreapple;