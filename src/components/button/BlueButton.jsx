import React from 'react';
import {Button} from "antd";
import styled from 'styled-components'

const BlueButton = styled(Button)`
    color: #fff !important;
    background-color: deepskyblue !important;
    &:hover {
        background-color: #009fff !important;
        border: 1px solid #efecec !important;
        color: #fff !important;
    }
    &:disabled {
        background-color: #9fdeff;
        &:hover {
            background-color:#9fdeff !important;
        }
    }
`

export default BlueButton;
