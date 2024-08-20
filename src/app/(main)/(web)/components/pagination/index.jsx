import React from 'react';
import {Pagination} from "antd";
import styles from './style.module.scss'

const Index = (props) => {
    return (
        <div className={styles.pagination_container}>
            <Pagination
                rootClassName={styles.pagination}
                hideOnSinglePage
                current={props.current}
                onChange={props.onChange}
                total={props.total}
                pageSize={props.pageSize}
            />
        </div>
    );
};

export default React.memo(Index);
