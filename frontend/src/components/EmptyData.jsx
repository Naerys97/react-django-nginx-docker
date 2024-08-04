import React from "react";
import { Button, Stack } from "rsuite";

function EmptyData({ refetch, disable }) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ height: "100%" }}
    >
      <p>No data was found.</p>
      <p>
        Try to{" "}
        <Button
          className="button-purple"
          appearance="primary"
          onClick={() => refetch()}
          disabled={disable}
        >
          Fetch
        </Button>{" "}
        the data again.
      </p>
    </Stack>
  );
}

export default EmptyData;
