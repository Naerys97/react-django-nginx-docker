import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Input,
  InputGroup,
  InputPicker,
  Message,
  Stack,
  useToaster,
} from "rsuite";
import { FiPlus, FiSearch } from "react-icons/fi";

import { useGetBooksQuery } from "../../features/books/bookApi";
import DataTable from "../../components/DataTable";
import EmptyData from "../../components/EmptyData";
import { BooksCell } from "../../components/books/BooksCell";

const qualityOps = ["Excellent", "Good", "Regular", "Bad"].map((v) => ({
  label: v,
  value: v.toLowerCase(),
}));

const amountOps = ["1", "2", "3", "4+"].map((v) => ({
  label: v,
  value: v,
}));

function BookListPage() {
  const navigate = useNavigate();
  const toaster = useToaster();
  const {
    isLoading,
    isFetching,
    data: books = [],
    refetch,
    isError,
    error,
  } = useGetBooksQuery();

  console.log("isLoading", isLoading);
  console.log("isFetching", isFetching);

  const [amount, setAmount] = useState("");
  const [quality, setQuality] = useState("");
  const [search, setSearch] = useState("");

  const dataColumns = [
    {
      key: "id",
      label: "Id",
      fixed: false,
      minWidth: 70,
    },
    {
      key: "title",
      label: "Title",
      fixed: true,
      minWidth: 150,
      fullText: true,
      flexGrow: 1,
    },
    {
      key: "authors",
      label: "Authors",
      fixed: false,
      minWidth: 150,
      fullText: true,
      flexGrow: 1,
    },
    {
      key: "quality",
      label: "Quality",
      fixed: false,
      minWidth: 100,
      flexGrow: 1,
      align: "center",
    },
    {
      key: "amount",
      label: "Amount",
      fixed: false,
      minWidth: 70,
      flexGrow: 1,
      align: "center",
    },
    {
      key: "editorial",
      label: "Editorial",
      fixed: false,
      minWidth: 150,
      flexGrow: 1,
    },
    {
      key: "actions",
      label: "Actions",
      fixed: "right",
      minWidth: 120,
      flexGrow: 1,
    },
  ];

  const filteredData = useMemo(() => {
    let computedData = books;

    if (search) {
      computedData = computedData.filter((data) => {
        return (
          data.title.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          data.editorial?.name.toLowerCase().indexOf(search.toLowerCase()) >
            -1 ||
          data.authors.find(
            (author) =>
              author.name.toLowerCase().indexOf(search.toLowerCase()) > -1
          )
        );
      });
    }

    if (amount) {
      computedData = computedData.filter((data) => {
        if (amount === "4+") {
          return data.amount >= 4;
        }
        return data.amount === parseInt(amount);
      });
    }

    if (quality) {
      computedData = computedData.filter(
        (data) => data.quality.toLowerCase() === quality.toLowerCase()
      );
    }

    return computedData;
  }, [books, amount, quality, search]);

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
          <h4>Books List</h4>
        </Stack>
        <Stack spacing={6}>
          <Button
            startIcon={<FiPlus />}
            className="button-green"
            onClick={() => navigate("create")}
          >
            Add Book
          </Button>
        </Stack>
      </Stack>
      <Stack className="table-toolbar" justifyContent="space-between">
        <Stack spacing={6} alignItems="center">
          <Col xsHidden smHidden>
            <h6>Filters:</h6>
          </Col>
          <Col xsHidden smHidden>
            <label>Quality:</label>
          </Col>
          <Col>
            <InputPicker
              placeholder="Quality"
              value={quality}
              onChange={setQuality}
              data={qualityOps}
            />
          </Col>
          <Col xsHidden smHidden>
            <label>Amount:</label>
          </Col>
          <Col>
            <InputPicker
              placeholder="Amount"
              value={amount}
              onChange={setAmount}
              data={amountOps}
            />
          </Col>
        </Stack>
        <Stack spacing={6}>
          <InputGroup inside>
            <Input placeholder="Search" value={search} onChange={setSearch} />
            <InputGroup.Addon>
              <FiSearch />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
      </Stack>
      <DataTable
        loading={isLoading || isFetching}
        columns={dataColumns}
        data={filteredData}
        dataCells={BooksCell}
        renderEmpty={() => <EmptyData refetch={refetch} disable={isFetching} />}
      />
    </>
  );
}

export default BookListPage;
