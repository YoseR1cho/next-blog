import React, {useState} from 'react';
import styles from "@/app/(main)/(web)/components/personInfo/style.module.scss";
import {Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import useAjaxLoading from "@/hooks/useAjaxLoading";

const MyUpload = (props) => {
    const [url,setUrl] = useState('')
    const [loading,withLoading] = useAjaxLoading();
    const {avatar,...rest} = props

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                上传您的头像
            </div>
        </button>
    );


    const beforeUpload = (file)=>{
        const reader = new FileReader()
        reader.onload = e=>{
            const dataUrl = e.target.result
            console.log(dataUrl);
            setUrl(dataUrl)
        }

        reader.readAsDataURL(file)

        return false
    }

    return (
        <Upload
            {...rest}
            name="avatar"
            listType="picture-circle"
            showUploadList={false}
            className={styles.avatar}
            beforeUpload={beforeUpload}
            maxCount={1}
        >
            {(avatar || url) ? (
                <>
                    <img
                        src={avatar || url}
                        alt="avatar"
                        style={{
                            width: '100%',
                            height:'100%',
                            borderRadius:'50%'
                        }}
                    />
                </>
            ) : (
                uploadButton
            )}
        </Upload>
    );
};

export default MyUpload;
