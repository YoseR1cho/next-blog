import React from 'react';
import {Button} from "antd";
import styled from 'styled-components'

const GreenButton = styled(Button)`
    color: #fff !important;
    background-color: #00c700 !important;

    &:hover {
        background-color: #00ee00 !important;
        border: 1px solid #efecec !important;
        color: #fff !important;
    }
    &:disabled {
        background-color: #9fff9f;
        &:hover {
            background-color: #9fff9f !important;
        }
    }
`

export default GreenButton;
