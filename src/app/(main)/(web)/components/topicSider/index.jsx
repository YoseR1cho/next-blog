import React, { useRef } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import {useParams} from "next/navigation";

const topics = [
    {
        title: "前端面试",
        id: 1,
    },
    {
        title: "随心记",
        id: 2,
    },
    {
        title: "个人摘要",
        id: 3,
    },
    {
        title: "读书笔记",
        id: 4,
    },
    {
        title: "项目笔记",
        id: 5,
    },
];

const Index = () => {
    const listRef = useRef();
    const params = useParams()
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.8em"
                    height="1.8em"
                    viewBox="0 0 48 48"
                >
                    <g
                        fill="none"
                        stroke="#000"
                        strokeLinejoin="round"
                        strokeWidth="4"
                    >
                        <path
                            fill="#2F88FF"
                            d="M8 40C8 36 8 10 8 10C8 6.68629 10.8654 4 14.4 4H40V36C40 36 19.9815 36 14.4 36C9.36225 36 8 36.6842 8 40Z"
                        />
                        <path
                            strokeLinecap="round"
                            d="M12 44H40V36H12C9.79086 36 8 37.7909 8 40C8 42.2091 9.79086 44 12 44Z"
                            clipRule="evenodd"
                        />
                    </g>
                </svg>
                <span>专题文章</span>
            </div>
            <ul className={styles.list_container} ref={listRef}>
                {topics.map(item => {
                    return (
                        <li key={item.id} className={(params && +(params.tId) === item.id)?styles.focused:''}>
                            <Link href={`/home/topic/${item.id}`}>
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Index;
