import React from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IconButton } from "rsuite";
import EditorialsUpdatePage from "../../pages/editorials/EditorialsUpdatePage";
import DeleteEditorial from "./DeleteEditorial";

function EditorialsCell(props) {
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
            onClick={() =>
              navigate(`/editorials/${rowData.id}`, { state: rowData })
            }
          />
          <EditorialsUpdatePage data={rowData} />
          {/* <IconButton
                icon={<FiEdit />}
                className="button-blue"
                  style={{ marginRight: "3px" }}
                appearance="primary"
                onClick={() => {}}
              /> */}
          <DeleteEditorial data={rowData}>
            <IconButton
              icon={<FiTrash2 />}
              className="button-red"
              appearance="primary"
            />
          </DeleteEditorial>
        </>
      );
    default:
      return rowData[dataKey];
  }
}

export default EditorialsCell;
