import React from 'react';
import './styles/Newsletter.css';

const Newsletter = () => {

    return (
        <div className="newsletterWrapperB">
            <h2 className="newsletterTitleB">The Command Brief</h2>
            <p className="newsletterDescriptionB">La newsletter que leen ingenieros, creativos e innovadores del sector. 👨🏻‍💻 Mantente al día de la tecnología en 5 minutos, ¡Recibe un email semanal gratuito con las historias más interesantes en el mundo tech 📱, IA 🧠 e Innovación 💡</p>
            <p className="newsletterDescriptionB">¡Suscríbete! 🚀</p>
            <iframe src="https://embeds.beehiiv.com/de9ab7fa-3e6f-4a25-a34d-36d163000b93?slim=true" data-test-id="beehiiv-embed" height="120" width="auto" frameBorder="0" scrolling="no" style={{margin: 0, borderRadius: '0px', backgroundColor: 'transparent'}}></iframe>
        </div>
    );
};

export default Newsletter;