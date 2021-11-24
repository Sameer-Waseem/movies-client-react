import React from "react";

const Like = ({ liked, onLike }) => {
  let classes = "fa fa-heart";
  classes += liked ? "" : "-o";

  return (
    <i style={{ cursor: "pointer" }} onClick={onLike} className={classes}></i>
  );
};

export default Like;
