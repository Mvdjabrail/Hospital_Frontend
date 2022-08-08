import React from 'react';
import styles from './deps/module.css'

const Title = () => {
    return (
        <>
        <div className={styles.title}>
            Отделения
        </div>
        <hr />
        <h4 className={styles.qute}>"Медицина поистине самое благородное из всех искусств."</h4>
        <div className={styles.author}>- Гиппократ</div>
        <hr />
        </>
    );
};

export default Title;