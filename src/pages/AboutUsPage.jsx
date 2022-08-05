import React from 'react';
import Splitter from '../components/Content/AboutUsContent/Splitter';
import Welcoming from '../components/Content/AboutUsContent/Welcoming';
import WhyUs from '../components/Content/AboutUsContent/WhyUs';

const AboutUsPage = () => {
    return (
        <div>
          <Welcoming />
          <Splitter />
          <WhyUs />
        </div>
    );
};

export default AboutUsPage;