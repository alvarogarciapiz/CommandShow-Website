import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import Title from './Title.jsx'
import Episodes from './Episodes.jsx'
import Newsletter from './Newsletter.jsx'
import Ghostcoreapple from './Ghostcoreapple.jsx'
import Footer from './Footer.jsx'
import Twitter from './Twitter.jsx'
import SobreNosotros from './SobreNosotros.jsx'

const Home = () => {
    return (
        <>
        <Ghostcoreapple />
        <Title />
        <Episodes />
        <Newsletter />
        <Twitter />
        <SobreNosotros />
        <Footer />
        </>
    );
};

export default Home;