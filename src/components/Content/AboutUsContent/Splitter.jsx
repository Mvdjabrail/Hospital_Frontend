import React from 'react';
import styles from "./aboutus.module.css";

const Splitter = () => {
    return (
        <div className={styles.splitter}>
            <div className={styles.splitterInner}>
            <h1 className={styles.quote}>"Медицина поистине самое благородное из всех искусств."</h1>
            <h4 className={styles.author}>- Гиппократ</h4>
            </div>
        </div>
    );
};

export default Splitter;