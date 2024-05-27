import {Menu, Layout, Dropdown, message} from "antd";
import React from "react";
import styles from './styles.module.scss'
import {
    EditOutlined, UserOutlined, DownOutlined, TeamOutlined, LogoutOutlined,} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import {useRouter} from 'next/navigation'
import {fetchLogout} from "@/store/user/actionCreators";
import Image from "next/image";
import SignModal from "@/components/signModal";
const {Header} = Layout;

const items = [
    {
        label: '归档',
        key: 'archive',
        icon: <EditOutlined />,
    },
    {
        label: '关于',
        key: 'about',
        icon: <UserOutlined />,
    },
];
function Index(){
    const [current, setCurrent] = React.useState('mail');
    const dispatch = useDispatch();
    const user = useSelector(store=>store.user)
    const router = useRouter();
    const onClick = (e) => {
        setCurrent(e.key);
        router.push(e.key);
    };

    const menu = (
        <Menu>
            <Menu.Item><TeamOutlined style={{marginRight:'5px'}}/><Link href='/user'>个人信息</Link></Menu.Item>
            <Menu.Item><div onClick={()=>{
                dispatch(fetchLogout());
                message.success('登出成功！')
            }}><LogoutOutlined style={{marginRight:'13px'}}/>登出</div></Menu.Item>
        </Menu>
    )


    return (
        <>
            <Header
                className={styles.header}
            >
                <div className={styles.leftHeader}>
                    <div className={styles.avatarBox}>
                        <Image src={'/images/avatar.png'} alt={'头像'} width={64} height={64}/>
                    </div>

                    <Menu onClick={onClick}
                          selectedKeys={[current]}
                          mode="horizontal"
                          items={items}
                          defaultOpenKeys={['archive','classify','about']}
                    />
                </div>
                <div className={styles.user}>
                    {user.isLogin?
                        (<Dropdown overlay={menu}>
                            <div className={styles.userInfo}>
                                <UserOutlined /> {`${user.username}`}<DownOutlined/>
                            </div>
                        </Dropdown>):
                        <>
                            <SignModal/>
                        </>
                    }
                </div>
            </Header>
        </>
    )
}

export default Index;
