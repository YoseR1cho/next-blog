import React from "react";
import { Button, Modal, Select } from "antd";
import BlueButton from "@/components/button/BlueButton";

const Index = props => {
    return (
        <div>
            <Modal
                destroyOnClose={true}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "2rem",
                        }}
                    >
                        <Button onClick={props.onCancel}>取消</Button>
                        <BlueButton onClick={props.onOk}>确认</BlueButton>
                    </div>
                }
                {...props}
            >
                {props.children}
            </Modal>
        </div>
    );
};

export default Index;
