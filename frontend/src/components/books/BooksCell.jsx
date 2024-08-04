import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IconButton, Tag } from "rsuite";
import DeleteBook from "./DeleteBook";

export const BooksCell = ({ rowData, dataKey, rowIndex, ...rest }) => {
  const navigate = useNavigate();

  switch (dataKey) {
    case "authors":
      let authorsLen = rowData["authors"].length;
      if (authorsLen === 1) {
        return rowData["authors"][0].name;
      } else if (authorsLen >= 2) {
        return `${rowData["authors"][0].name}, ${authorsLen - 1}+`;
      } else {
        return "Not Specified";
      }
    case "quality":
      let tag = rowData[dataKey];
      return (
        <Tag
          className={`tag-${
            tag === "excellent"
              ? "pink"
              : tag === "good"
              ? "green"
              : tag === "bad"
              ? "red"
              : tag === "regular"
              ? "purple"
              : "grey"
          }`}
        >
          {tag === "" ? "Not Specified" : tag}
        </Tag>
      );

    case "editorial":
      return rowData[dataKey]?.name || "Not Specified";
    case "actions":
      return (
        <>
          <IconButton
            icon={<FiEdit />}
            className="button-blue"
            style={{ marginRight: "3px" }}
            appearance="primary"
            onClick={() => navigate(`update/${rowData.id}`, { state: rowData })}
          />
          <DeleteBook data={rowData}>
            <IconButton
              icon={<FiTrash2 />}
              className="button-red"
              appearance="primary"
            />
          </DeleteBook>
        </>
      );
    default:
      return rowData[dataKey];
  }
};
