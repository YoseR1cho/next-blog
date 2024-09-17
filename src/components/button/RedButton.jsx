import React from 'react';
import {Button} from "antd";
import styled from 'styled-components'

const RedButton = styled(Button)`
    color: #fff !important;
    background-color: #f84242 !important;
    color: #fff;
    &:hover {
        border: 1px solid #efecec !important;
        background-color: #ff0000 !important;
        color: #fff !important;
    }
`

export default RedButton;
