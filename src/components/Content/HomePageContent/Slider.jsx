import React, { useEffect } from 'react';
import styles from './hp.module.css'
import doc from "../../../assets/slider-1.png"
import { Link } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css"

const Slider = () => {

    useEffect(()=>{
        Aos.init({duration: 2000})
    }, [])

    return (
        <div data-aos="fade-up" className={styles.sliderCnt}>
            <img data-aos="fade-up" alt='doc' className={styles.doc} src={doc} />
            {/* <div className={styles.info}>
                <b className={styles.services}>Мединские Услуги</b>
                <div className={styles.iconCnt}>
                    <Link className={styles.icons} to={'/departments/62f111d0dfc60002b5909121'}><img alt='ped' src='https://health-center.vamtam.com/wp-content/uploads/revslider/home-health-slider/slider-icon1.png' className={styles.ped}/></Link>
                    <Link className={styles.icons} to={'/departments/62f218da87825120da6764b2'}><img alt='pulm' src='https://health-center.vamtam.com/wp-content/uploads/revslider/home-health-slider/slider-icon2.png' className={styles.pulm}/></Link>
                    <Link className={styles.icons} to={'/departments/62f218b987825120da6764b0'}><img alt='trau' src='https://health-center.vamtam.com/wp-content/uploads/revslider/home-health-slider/slider-icon3.png' className={styles.icons}/></Link>
                    <Link className={styles.icons} to={'/departments/62f1135cdfc60002b5909127'}><img alt='dent' src='https://health-center.vamtam.com/wp-content/uploads/revslider/home-health-slider/slider-icon4.png' className={styles.dent}/></Link>
                    <Link className={styles.icons} to={'/departments'}><div className={styles.all}>Смотреть все</div></Link>
                </div>
                <div className={styles.bragging}>Больше 330 специалистов!</div>
            </div> */}
        </div>
    );
};

export default Slider;