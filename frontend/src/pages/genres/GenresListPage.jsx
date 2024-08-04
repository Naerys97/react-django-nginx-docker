import React from "react";
import { Message, Stack, useToaster } from "rsuite";
import DataTable from "../../components/DataTable";
import EmptyData from "../../components/EmptyData";
import GenresCell from "../../components/genres/GenresCell";
import { useGetGenresQuery } from "../../features/genres/genresApi";
import GenresCreatePage from "./GenresCreatePage";

function GenresListPage() {
  const {
    data: genres = [],
    isFetching,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetGenresQuery();
  const toaster = useToaster();

  const dataColumns = [
    {
      key: "id",
      label: "Id",
      // fixed: true,
      minWidth: 45,
      flexGrow: 1,
    },
    {
      key: "genre",
      label: "Genre",
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
    <>
      <Stack className="panel-toolbar" justifyContent="space-between">
        <Stack spacing={10}>
          <h4>Genres List</h4>
        </Stack>
        <Stack spacing={6}>
          <GenresCreatePage />
        </Stack>
      </Stack>
      <DataTable
        loading={isLoading || isFetching}
        columns={dataColumns}
        data={genres}
        dataCells={GenresCell}
        renderEmpty={() => <EmptyData refetch={refetch} disable={isFetching} />}
      />
    </>
  );
}

export default GenresListPage;
