import React from 'react';
import './styles/SobreNosotros.css';
import alvaro from './assets/alvaro.jpeg';
import samuel from './assets/samuel.jpeg';

const SobreNosotros = () => {

    return (
        <div class="contenedorSN">
            <div class="smallSN">
                <div className="tarjetaSN">
                    <img src={alvaro} alt="Álvaro" />
                    <p>Álvaro</p>
                </div>
            </div>
            <div class="smallSN">
                <div className="tarjetaSN">
                    <img src={samuel} alt="Samuel" />
                    <p>Samuel</p>
                </div>
            </div>
        </div>
    );
};

export default SobreNosotros;