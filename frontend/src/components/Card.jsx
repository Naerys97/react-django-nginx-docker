import React from "react";
import { Panel } from "rsuite";

function Card({ children, ...props }) {
  return (
    <Panel style={{background: '#fff'}} shaded bordered {...props}>
      {children}
    </Panel>
  );
}

export default Card;
