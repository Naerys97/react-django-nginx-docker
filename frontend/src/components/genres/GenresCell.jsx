import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { IconButton } from "rsuite";
import DeleteGenre from "./DeleteGenre";
import GenresUpdate from "./GenresUpdate";

function GenresCell(props) {
  const { rowData, dataKey } = props;

  switch (dataKey) {
    case "actions":
      return (
        <>
          <GenresUpdate data={rowData} />
          {/* <IconButton
                  icon={<FiEdit />}
                  className="button-blue"
                    style={{ marginRight: "3px" }}
                  appearance="primary"
                  onClick={() => {}}
                /> */}
          <DeleteGenre data={rowData}>
            <IconButton
              icon={<FiTrash2 />}
              className="button-red"
              appearance="primary"
            />
          </DeleteGenre>
        </>
      );
    default:
      return rowData[dataKey];
  }
}

export default GenresCell;
