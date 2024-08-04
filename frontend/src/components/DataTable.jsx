import React, { useState } from "react";
import { Pagination, Table } from "rsuite";
// import { CustomCell } from "./books/CustomCell";

const { Column, HeaderCell, Cell } = Table;

function DataTable(props) {
  const { data = [], columns, dataCells, ...rest } = props;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const handleChangeLimit = (l) => {
    setPage(1);
    setLimit(l);
  };

  const filteredData = data.filter((v, i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  return (
    <>
      <Table height={400} {...rest} data={filteredData}>
        {columns.map(({ key, label, ...rest }) => (
          <Column {...rest} key={key}>
            <HeaderCell> {label} </HeaderCell>
            <Cell style={key === "actions" ? { padding: "5px" } : null}>
              {(rowData) => dataCells({ rowData: rowData, dataKey: key })}
            </Cell>
          </Column>
        ))}
      </Table>
      <div style={{ padding: 20 }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[10, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
          disabled={data.length === 0}
        />
      </div>
    </>
  );
}

export default DataTable;
