import React from "react";
import { Button, Col, Container, FlexboxGrid } from "rsuite";
import { error404 } from "../../media/media";
import { useNavigate } from "react-router-dom";

function Error404Page() {
  const navigate = useNavigate();
  return (
    <Container
      as={FlexboxGrid}
      justify="center"
      align="middle"
      style={{ height: "100%" }}
    >
      <FlexboxGrid.Item as={Col} xs={24} md={8}>
        <FlexboxGrid justify="center" align="middle">
          <div>
            <img
              src={error404}
              height={400}
              width={500}
              alt="Error Page Not Found"
            />
          </div>
          <Button onClick={() => navigate("/")} className="button-pink" >Go Back Home</Button>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </Container>
  );
}

export default Error404Page;
