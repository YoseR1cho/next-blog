import React from 'react';
import {message} from "antd";
import styles from "./styles.module.scss";
import {useForm} from "react-hook-form";
import {USERNAMEEXP, PASSWORDEXP, EMAILEXP, SECRET} from '@/utils/config'
import {ExclamationCircleOutlined} from "@ant-design/icons";
import md5 from "js-md5";
import {useDispatch} from "react-redux";
import {fetchRegister} from "@/store/user/actionCreators";

const Register = ({setOpen}) => {

    const {register,handleSubmit,formState:{errors},getValues,reset} = useForm();
    const dispatch = useDispatch();
    const handleRegister = (data)=>{
        const {username,password,email} = data;
        const decrypt = md5(password,SECRET);
        const res = dispatch(fetchRegister({username,password:decrypt,email}));
        res.then(()=>{
            message.success('注册成功，请登录~')
            setOpen(false);
            reset();
        }).catch(err=>{
            message.error(err.message);
        })


    }

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="a" required className={styles.input}
                           {...register('username',{required:true,pattern:USERNAMEEXP})}
                    />
                    <label htmlFor="" className={styles.label}>用户名</label>
                </div>
                {errors.username && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.username.type === 'required'?'请输入您的用户名':'请输入由5-15个汉字、字母或数字组成的用户名哦！'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="a"required className={styles.input}
                           {...register('password',{required:true,pattern:PASSWORDEXP})}
                    />
                    <label htmlFor="" className={styles.label}>密码</label>
                </div>
                {errors.password && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.password.type === 'required'?'请输入您的密码':'请输入由6-20个字母、数字或下划线组成的密码哦！'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="a" required className={styles.input}
                           {...register('cpassword',{required:true,validate:(value)=>value===getValues("password")})}
                    />
                    <label htmlFor="" className={styles.label}>确认密码</label>
                </div>
                {errors.password && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.password.type === 'required'?'请确认输入的密码':'两次输入的密码不一致'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="a"required className={styles.input}
                           {...register('email',{required:true,pattern:EMAILEXP})}
                    />
                    <label htmlFor="" className={styles.label}>电子邮件</label>
                </div>
                {errors.email && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.email.type === 'required'?'请输入您的电子邮件':'请输入正确格式的电子邮件'}</p>)}
                <button type='submit'>注册</button>
            </form>
        </div>
    );
};

export default Register;
