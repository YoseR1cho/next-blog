import React from 'react';
import styles from './style.module.scss'

const Index = ({loading,children}) => {
    return (
            <>
                {
                    loading && (<div className={styles.container}>
                        <div className={styles.loader}/>
                    </div>)

                }
                {children}
            </>
    );
};

export default Index;
