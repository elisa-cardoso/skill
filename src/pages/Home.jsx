import React from 'react'
import Posts from '../components/Posts'
import Banner from '../components/Banner'
import CardHome from '../components/CardHome';
import { IoLibrary } from "react-icons/io5";
import { RiChatSmile2Fill } from "react-icons/ri";


const Home = () => {
    const cardData = [
        {
            icon: <RiChatSmile2Fill style={{height: 30, width: 30 }}/>,
            title: 'Compartilhe Conhecimento!',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            link: '/skill/new',
            buttonText: 'Crie uma skill'
        },
        {
            icon: <IoLibrary style={{height: 30, width: 30 }}/>,
            title: 'Comece sua própria biblioteca!',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
            link: 'user-skill/new',
            buttonText: 'Associe-se com uma skill'
        }
    ];
    return (
        <>
        <Banner
        title="Transforme Seu Futuro com Tecnologia!"
        subtitle="De programadores a analistas de dados, oferecemos uma vasta gama de cursos e recursos projetados para impulsionar sua carreira e manter você na vanguarda do mercado de trabalho."
        text="Desenvolva suas habilidades com nossa biblioteca de tecnologias de ponta."
        buttonText="Construa sua biblioteca!"
        buttonLink="/user-skill"
    />
    <CardHome cards={cardData} />
        <Posts/>
        </>
    )
}

export default Home