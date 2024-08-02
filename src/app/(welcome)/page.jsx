'use client'
import React from 'react'
import styles from './page.module.scss'
import { Layout } from 'antd'
import { useRouter} from "next/navigation";
import Typer from "./Typer"

const Page = ({}) => {
    const router = useRouter()
    function redirectToHome() {
        router.push('/home')
    }

    return (
        <Layout style={{ width: '100%', height: '100%' }} >
            <div className={styles.container} onClick={redirectToHome}>
                <Typer/>
                <div className={`${styles.bird_container} ${styles.bird_container_one}`}>
                    <div className={`${styles.bird} ${styles.bird_one}`}></div>
                </div>

                <div className={`${styles.bird_container} ${styles.bird_container_two}`}>
                    <div className={`${styles.bird} ${styles.bird_two}`}></div>
                </div>

                <div className={`${styles.bird_container} ${styles.bird_container_three}`}>
                    <div className={`${styles.bird} ${styles.bird_three}`}></div>
                </div>

                <div className={`${styles.bird_container} ${styles.bird_container_four}`}>
                    <div className={`${styles.bird} ${styles.bird_four}`}></div>
                </div>
            </div>
        </Layout>

    )
}
export default Page
