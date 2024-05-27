import React from 'react';
import Authadmin from "@/app/(main)/(admin)/admin/components/Authadmin";
import AntdLayout from "@/app/(main)/(admin)/admin/AntdLayout";

const Layout = ({children}) => {
    return (
        <Authadmin>
            <AntdLayout>
                {children}
            </AntdLayout>
        </Authadmin>
    );
};

export default Layout;
