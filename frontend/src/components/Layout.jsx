import React from "react";
import { Col, Container, FlexboxGrid } from "rsuite";
import Card from "./Card";

function Layout({ children }) {
  return (
    <Container>
      <FlexboxGrid justify="center" style={{marginTop:'2em'}}>
        <FlexboxGrid.Item as={Col} xs={24} sm={22} md={22}  colspan={20}>
          <Card>{children}</Card>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Container>
  );
}

export default Layout;
