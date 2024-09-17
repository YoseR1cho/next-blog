import React, {useState} from 'react';
import dynamic from "next/dynamic";
import styles from './styles.module.scss'
import {Modal} from "antd";
import {LoginOutlined} from "@ant-design/icons";
import useAjaxLoading from "@/hooks/useAjaxLoading";

const Login = dynamic(()=>import('./Login'))
const Register = dynamic(()=>import('./Register'))

const App = () => {
    const [open, setOpen] = useState(false);
    const [type,setType] = useState('');
    const [loading,withLoading] = useAjaxLoading()

    const handleOpen = (type)=>{
        setType(type)
        setOpen(true)
    }


    return (
        <>
            <button className={styles.login} onClick={()=>handleOpen('登录')}>
                <LoginOutlined/>登录
            </button>
            <button className={styles.register} onClick={()=>handleOpen('注册')}>
                <LoginOutlined/>注册
            </button>
            <Modal
                width={460}
                title={type}
                open={open}
                onCancel={()=>setOpen(false)}
                maskClosable={false}
                footer={null}
                className={styles.modal}
            >
                {type === '登录' ? <Login setOpen={setOpen} loading={loading} withLoading={withLoading}/> : <Register setOpen={setOpen}  loading={loading} withLoading={withLoading}/>}
            </Modal>
        </>
    );
};
export default App;
