import React from 'react';
import styles from "@/components/button/style.module.scss";
import {Button} from "antd";

const RedButton = (props) => {
    return (
        <Button className={styles.redBtn} {...props}>
            {props.children}
        </Button>
    );
};

export default RedButton;
