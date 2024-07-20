import React from "react";
import TagList from "./TagList";
import styles from "./style.module.scss";


const TagsView = () => {
  return (
    <div className={styles.tagsView_container}>
      <TagList />
    </div>
  );
};

export default TagsView;
