import React from 'react';
import styles from './page.module.scss'
import { Divider } from 'antd'
import {useRouter} from "next/navigation";
import {EyeOutlined, HeartOutlined} from "@ant-design/icons";
import moment from 'moment'

const List = ({list}) => {
    const router = useRouter();

    function jumpTo(id){
        router.push(`/article/${id}`)
    }

    return (
        <ul className={styles.app_List}>
            {list.map(item => (
                <div key={item._id}>
                    <li className={styles.appList_item}>
                        <Divider orientation='left'>
                            <span className={styles.title} onClick={() => jumpTo(item._id)}>
                                {item.title}
                            </span>
                        </Divider>
                        <div
                            onClick={() => jumpTo(item._id)}
                            className={styles.article_detail}>
                            {item.summary}
                        </div>
                        <div className={styles.list_item_others}>
                            <div>
                                <EyeOutlined /> {item.view}
                            </div>
                            <div>
                                <HeartOutlined /> 0
                            </div>
                            <div>
                                {moment(item.createAt).format('YYYY-MM-DD HH:MM:ss')}
                            </div>
                        </div>
                    </li>
                </div>
            ))}
        </ul>
    );
};

export default List;
