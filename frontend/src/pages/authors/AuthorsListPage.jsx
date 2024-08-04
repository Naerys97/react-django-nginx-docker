import React from "react";
import { Outlet } from "react-router-dom";
import {
  Col,
  Divider,
  FlexboxGrid,
  Message,
  Row,
  Stack,
  useToaster,
} from "rsuite";
import { AuthorsCell } from "../../components/authors/AuthorsCell";
import DataTable from "../../components/DataTable";
import EmptyData from "../../components/EmptyData";
import { useGetAuthorsQuery } from "../../features/authors/authorsApi";
import AuthorsCreatePage from "./AuthorsCreatePage";

function AuthorsListPage() {
  const {
    data: authors = [],
    isFetching,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetAuthorsQuery();
  const toaster = useToaster();

  const dataColumns = [
    {
      key: "id",
      label: "Id",
      // fixed: true,
      minWidth: 45,
      // flexGrow: 1,
    },
    {
      key: "name",
      label: "Name",
      fixed: true,
      minWidth: 150,
      fullText: true,
      flexGrow: 1,
    },
    {
      key: "actions",
      label: "Actions",
      fixed: true,
      minWidth: 150,
      flexGrow: 1,
    },
  ];

  if (isError) {
    console.log("error", error);
    toaster.push(
      <Message showIcon type="error" closable header="Error">
        The following error ocurred while trying to fetch the books:{" "}
        {error.error}
      </Message>,
      { duration: 5000, placement: "topCenter" }
    );
  }

  return (
    <FlexboxGrid as={Row} justify="space-between">
      <Col xs={24} md={10} lg={11}>
        <Stack className="panel-toolbar" justifyContent="space-between">
          <Stack spacing={10}>
            <h4>Authors List</h4>
          </Stack>
          <Stack spacing={6}>
            <AuthorsCreatePage />
          </Stack>
        </Stack>
        <DataTable
          loading={isLoading || isFetching}
          columns={dataColumns}
          dataCells={AuthorsCell}
          data={authors}
          renderEmpty={() => (
            <EmptyData refetch={refetch} disable={isFetching} />
          )}
        />
      </Col>
      <Col xsHidden smHidden md={1} lg={1}>
        <Divider vertical style={{ height: "450px" }} />
      </Col>
      <Col xs={24} md={12} lg={11}>
        <Outlet />
      </Col>
    </FlexboxGrid>
  );
}

export default AuthorsListPage;
