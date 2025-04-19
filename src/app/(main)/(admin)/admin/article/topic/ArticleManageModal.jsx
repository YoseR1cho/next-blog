import React from "react";
import MyModal from "@/components/MyModal";


export default function ArticleManageModal({ isModalOpen,onCancel }) {
    return (
      <MyModal open={isModalOpen} onCancel={onCancel}>ArticleManageModal</MyModal>
    )
}
