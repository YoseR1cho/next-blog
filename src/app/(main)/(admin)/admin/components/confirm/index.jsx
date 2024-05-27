import React from 'react';
import styles from './styles.module.css'
import {ExclamationCircleTwoTone} from "@ant-design/icons";

const Confirm = ({message,onOk,setDeleting}) => {
    return (
            <div className={styles.mask}>
                <div className={styles.confirm}>
                    <div className={styles.notification}>
                        <ExclamationCircleTwoTone className={styles.icon}/>
                        <h2 className={styles.confirm_message}>{message}</h2>
                    </div>
                    <div className={styles.confirm_btn}>
                        <button className={styles.nobtn} onClick={()=>setDeleting({state:false,id:''})}>取消</button>
                        <button className={styles.okbtn} onClick={onOk}>确认</button>
                    </div>
                </div>

            </div>
    );
};

export default Confirm;
