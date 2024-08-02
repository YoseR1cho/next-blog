import React from 'react';
import {Button} from "antd";
import styles from './style.module.scss'

const BlueButton = (props) => {
    return (
        <Button className={styles.blueBtn} {...props}>
            {props.children}
        </Button>
    );
};

export default BlueButton;
