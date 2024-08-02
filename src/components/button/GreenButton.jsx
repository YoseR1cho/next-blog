import React from 'react';
import styles from "@/components/button/style.module.scss";
import {Button} from "antd";

const GreenButton = (props) => {
    return (
        <Button className={styles.greenBtn} {...props}>
            {props.children}
        </Button>
    );
};

export default GreenButton;
