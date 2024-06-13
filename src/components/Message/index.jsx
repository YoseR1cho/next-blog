import React, {useEffect, useState} from 'react';
import {createPortal} from "react-dom";
import styles from './style.module.scss'

const Index = ({msg}) => {
    const [container, setContainer] = useState(null);

    useEffect(()=>{
        // 创建一个新的 div 元素
        const newContainer = document.createElement('div');
        // 将新的 div 元素添加到 body 节点上
        document.body.appendChild(newContainer);
        // 设置状态
        setContainer(newContainer);
        // 组件卸载时，从 body 节点上移除 div 元素
        return () => {
            document.body.removeChild(newContainer);
        };

    },[])

    return container ? createPortal(
        <div className={styles.modal}>
            {msg}
        </div>
    ,container):null
};

export default Index;
