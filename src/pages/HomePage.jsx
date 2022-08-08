import React from 'react';
import Splitter from '../components/Content/AboutUsContent/Splitter';
import Welcoming from '../components/Content/AboutUsContent/Welcoming';
import WhyUs from '../components/Content/AboutUsContent/WhyUs';
import Cards from '../components/Content/HomePageContent/Cards';
import Slider from '../components/Content/HomePageContent/Slider';

const HomePage = () => {
    return (
        <>
         <Slider />
         <Cards />
         <Welcoming />
         <Splitter />
         <WhyUs />
         </>
    );
};

export default HomePage;