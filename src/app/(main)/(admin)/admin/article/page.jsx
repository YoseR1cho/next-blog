import React from 'react';
import {redirect} from "next/navigation";

const Page = () => {
    redirect('/admin/article/publish/')
    return (
        <>
        </>
    );
};

export default Page;
