import React from "react";
import { Col, Divider, Row, Tag } from "rsuite";

function AuthorsDetails({ book }) {
  return (
    <Row
      style={{
        background: "#ffffffaa",
        marginLeft: "20px",
        marginRight: "20px",
        borderRadius: "5px",
      }}
    >
      <Col xs={5} sm={6} md={6} xl={5} style={{ padding: "0" }}>
        <img
          src={book.cover}
          alt={book.title}
          height="110"
          width="85"
          style={{ borderRadius: "5px" }}
        />
      </Col>
      <Col
        xs={24}
        sm={18}
        md={17}
        xl={18}
        style={{ padding: "6px", marginLeft: "0.5rem" }}
      >
        <div style={{ lineHeight: "1.5" }}>{book.title}</div>
        <Divider style={{ margin: "3px" }} />
        <div>
          {book.authors.map((a, i) => (
            <Tag className="tag-pink" key={i}>
              {a}
            </Tag>
          ))}
        </div>
        <div style={{ marginTop: "2px" }}>{book.description}</div>
      </Col>
    </Row>
  );
}

export default AuthorsDetails;
