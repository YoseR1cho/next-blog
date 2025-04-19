import React from 'react';
import styles from './styles.module.scss'
import TagContainer from "@/app/(main)/(web)/components/sideBar/TagContainer";
import LinkList from "@/app/(main)/(web)/components/sideBar/LinkList";
import Link from "next/link";

function SideBar(){

    return (
        <div>
            <aside className={styles.menu}>
                <div className={styles.menu_box}>
                    <div className={styles.wrap}>
                        <div className={styles.avatar}></div>
                        <h2><Link href="/home">YoseR1cho</Link></h2>
                        <p>感谢关顾</p>
                        <nav className={styles.mainNav}>
                            <LinkList/>
                        </nav>
                    </div>
                </div>
                <TagContainer/>
            </aside>
        </div>
    );
};

export default SideBar;
