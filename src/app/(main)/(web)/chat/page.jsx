'use client'
import styles from './page.module.scss'
import {useChat} from "@ai-sdk/react";
import {useSelector} from "react-redux";
import {message} from "antd";
import Image from "next/image";
import React, {useEffect, useId, useRef} from "react";
import {CopyOutlined, DeleteOutlined, RedoOutlined, SendOutlined} from "@ant-design/icons";
import {debounce} from "@/utils";

export default function Page(){
    const user = useSelector(store=>store.user)
    const btnRef = useRef()
    const textRef = useRef()
    const { messages, input, handleInputChange, handleSubmit, setMessages ,reload } = useChat({
            api:'api/chat'
    });
    const id = useId()

    const submitHandler = function (e){
        e.preventDefault()
        if(!user.isLogin){
            message.warning('请登录后再操作!')
            return ;
        }
        handleSubmit(e)
    }

    const keyDownHandler = (e)=>{
        const code = e.code
        console.log(code);
        if(code === 'Enter' && !e.shiftKey){
            btnRef.current.click()
        }
    }

    const handlerCopy = (m)=>{
        navigator.clipboard.writeText(m.content).then(text=>{
            message.success('已复制到剪切板')
        })
    }

    const handlerRefresh = (m)=>{
        reload(m)
    }

    useEffect(()=>{
        setMessages([{role:"assistant",content:'有什么可以帮你的吗?',id}])
    },[])

    return (
        <div className={styles.chatContainer}>
            <div className={styles.main}>
                {messages.map(m =>
                    (
                        <div key={m.id} className={`${styles.item} ${m.role === 'user' && styles.user_item }`}>
                            <div className={styles.item_container}>
                                <div className={styles.item_header}>
                                    <div className={styles.item_avatar}>
                                        {
                                            m.role === 'user' ? (
                                                <Image src={user.avatar || '/images/burger.svg'} width={24} height={24} alt='avatar'/>
                                            ):(
                                                <Image src={'/images/ai.svg'} width={24} height={24} alt='avatar'/>
                                            )
                                        }
                                    </div>
                                    <ul className={styles.item_actions}>
                                        <li onClick={()=>setMessages(messages.filter(message=>message.id!==m.id))}><DeleteOutlined /></li>
                                        <li onClick={()=>handlerRefresh(m)}><RedoOutlined /></li>
                                        <li onClick={()=>handlerCopy(m)}><CopyOutlined /></li>
                                    </ul>
                                </div>
                                <div className={m.role === 'user' ?styles.user:styles.ai}>
                                    {m.content}
                                </div>
                            </div>

                        </div>
                    )

                )}
            </div>

            <div className={styles.footer}>
                <form onSubmit={submitHandler}>
                    <label htmlFor="chat-input">
                        <textarea
                            id='chat-input'
                            value={input}
                            placeholder="Enter 发送，Shift + Enter 换行"
                            onChange={handleInputChange}
                            onKeyDown={keyDownHandler}
                        />
                        <button className={styles.post} ref={btnRef} type='submit'><SendOutlined /> 发送</button>
                    </label>
                </form>

            </div>
        </div>
    );

}
