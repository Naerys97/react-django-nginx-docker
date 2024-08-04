import React from "react";
import { IconButton } from "rsuite";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeleteAuthor from "./DeleteAuthor";

export const AuthorsCell = (props) => {
  // console.log("cellProps", props);
  const { rowData, dataKey } = props;
  const navigate = useNavigate();

  switch (dataKey) {
    case "actions":
      return (
        <>
          <IconButton
            icon={<FiEye />}
            className="button-purple"
            style={{ marginRight: "3px" }}
            appearance="primary"
            onClick={() => navigate(`/authors/${rowData.id}`, {state: rowData})}
          />
          {/* <IconButton
            icon={<FiEdit />}
            className="button-blue"
              style={{ marginRight: "3px" }}
            appearance="primary"
            onClick={() => {}}
          /> */}
          <DeleteAuthor data={rowData}>
          <IconButton
            icon={<FiTrash2 />}
            className="button-red"
            appearance="primary"
          />
          </DeleteAuthor>
        </>
      );
    default:
      return rowData[dataKey];
  }
};

// export default AuthorsCell;
