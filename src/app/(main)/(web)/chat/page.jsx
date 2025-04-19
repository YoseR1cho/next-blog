"use client";
import styles from "./page.module.scss";
import { useChat } from "@ai-sdk/react";
import { useSelector } from "react-redux";
import { message } from "antd";
import Image from "next/image";
import React, { useEffect, useId, useRef,useState } from "react";
import MarkdownTxt from "@/components/MarkdownTxt";
import LoadingIcon from '@/components/LoadingIcon'
import handleLS from "@/utils/handleLS";
import {
    CopyOutlined,
    DeleteOutlined,
    RedoOutlined,
    SendOutlined,
} from "@ant-design/icons";

export default function Page() {
    const user = useSelector(store => store.user);
    const btnRef = useRef();
    const mainRef = useRef();
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        setMessages,
        reload,
    } = useChat({
        api: "/api/chat",
        headers: {
            "Accept": "text/event-stream",
            "Content-Type": "application/json",
        },
        initialMessages: [
            ...handleLS.get('ai-chat-stream-messages') || {
                role: "assistant",
                content: "你好，我是专属于YoseR1cho的AI助手，有什么可以帮到您的？",
                id: useId()
            }
        ],
        onResponse: (response) => {
            // 每次收到新的响应片段时滚动到底部
            setLoading(false);
            scrollToBottom();
        },
        onFinish: () => {
            handleLS.set('ai-chat-stream-messages', messages);
            scrollToBottom();
        },
        onError: error => {
            message.error(error.message || "请求失败");
        }
    });
    const id = useId();
    const [isComposing, setIsComposing] = useState(false);
    const [loading,setLoading] = useState(false);

    // 滚动到底部的函数
    const scrollToBottom = () => {
        if (mainRef.current) {
            setTimeout(() => {
                mainRef.current?.scrollTo({
                    top: mainRef.current.scrollHeight,
                    behavior: "smooth",
                });
            }, 100);
        }
    };

    const submitHandler = function (e) {
        e.preventDefault();
        if (!user.isLogin) {
            message.warning("请登录后再操作!");
            return;
        }
        setLoading(true);
        handleSubmit(e);
        // 发送消息后滚动到底部
        scrollToBottom();
    };

    const keyDownHandler = e => {
        const code = e.code;

        if (code === "Enter" && !e.shiftKey && !isComposing) {
            e.preventDefault(); // 阻止默认行为
            btnRef.current.click();
        }
    };

    const handlerCopy = m => {
        navigator.clipboard.writeText(m.content).then(text => {
            message.success("已复制到剪切板");
        });
    };

    const handlerRefresh = async m => {
        try {
            setLoading(true);
            await reload(m);
            // 刷新消息后滚动到底部
            scrollToBottom();
        } catch (e) {
            message.error(e.message);
        }
    };

    useEffect(() => {
        // 初始化消息后滚动到底部
        scrollToBottom();
    }, []);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.main} ref={mainRef}>
                {messages.map(m => (
                    <div
                        key={m.id}
                        className={`${styles.item} ${m.role === "user" && styles.user_item}`}
                    >
                        <div className={styles.item_container}>
                            <div className={styles.item_header}>
                                <div className={styles.item_avatar}>
                                    {m.role === "user" ? (
                                        <Image
                                            src={
                                                user.avatar ||
                                                "/images/burger.svg"
                                            }
                                            width={24}
                                            height={24}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <Image
                                            src={"/images/ai.svg"}
                                            width={24}
                                            height={24}
                                            alt="avatar"
                                        />
                                    )}
                                </div>
                                <ul className={styles.item_actions}>
                                    <li
                                        onClick={() => {
                                            setMessages(
                                                messages.filter(
                                                    message =>
                                                        message.id !== m.id
                                                )
                                            );
                                            scrollToBottom();
                                        }}
                                    >
                                        <DeleteOutlined />
                                    </li>
                                    <li onClick={() => handlerRefresh(m)}>
                                        <RedoOutlined />
                                    </li>
                                    <li onClick={() => handlerCopy(m)}>
                                        <CopyOutlined />
                                    </li>
                                </ul>
                            </div>
                            <div
                                className={
                                    m.role === "assistant"? styles.ai:styles.user
                                }
                            >
                                {m.role === 'user' ?m.content:(
                                    <MarkdownTxt
                                    markdown={m.content}
                                />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {
                    loading&&<div className={styles.item}>
                        <div className={styles.item_container}>
                            <div className={styles.item_header}>
                                <div className={styles.item_avatar}>
                                    <Image
                                        src={"/images/ai.svg"}
                                        width={24}
                                        height={24}
                                        alt="avatar"
                                    />
                                </div>
                            </div>
                            <div className={styles.bot}>
                                <LoadingIcon />
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className={styles.footer}>
                <form onSubmit={submitHandler}>
                    <label htmlFor="chat-input">
                        <textarea
                            id="chat-input"
                            value={input}
                            placeholder="Enter 发送，Shift + Enter 换行"
                            onChange={handleInputChange}
                            onKeyDown={keyDownHandler}
                            onCompositionStart={() => setIsComposing(true)}
                            onCompositionEnd={() => setIsComposing(false)}
                        />
                        <button
                            className={styles.post}
                            ref={btnRef}
                            type="submit"
                        >
                            <SendOutlined /> 发送
                        </button>
                    </label>
                </form>
            </div>
        </div>
    );
}
