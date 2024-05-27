import React from 'react';
import {Pagination} from "antd";

const Index = (props) => {
    return (
        <div>
            <Pagination
                style={{display:"flex",justifyContent:'center',marginRight:'30vh'}}
                hideOnSinglePage
                current={props.current}
                onChange={props.onChange}
                total={props.total}
                pageSize={props.pageSize}
            />
        </div>
    );
};

export default Index;
