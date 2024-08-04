import React, { useState } from "react";
import { Navbar, Nav, Affix } from "rsuite";
import { Icon } from "@rsuite/icons";
import { FaGithubAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {logo} from "../media/media";

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function NavBar() {
  const [activeKey, setActiveKey] = useState(null);
  return (
    <Affix>
      <Navbar style={{ boxShadow: "2px 1px 6px", background:'#fff' }}>
        <Navbar.Brand href="/" style={{ padding: 0 }}>
          <img
            src={logo}
            height="100%"
            alt="Logo.png"
            style={{ margin:'0 7px 0 10px' }}
          />
        </Navbar.Brand>
        <Nav onSelect={setActiveKey} activeKey={activeKey}>
          <Nav.Item as={NavLink} href='/books' eventKey="1">
            Books
          </Nav.Item>
          <Nav.Item as={NavLink} href='/authors' eventKey="2">
            Authors
          </Nav.Item>
          <Nav.Item as={NavLink} href='/editorials' eventKey="3">
            Editorials
          </Nav.Item>
          <Nav.Item as={NavLink} href='/genres' eventKey="4">
            Genres
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Item href='https://github.com/Naerys97/books-catalog-front' ><Icon as={FaGithubAlt}/></Nav.Item>
          <Nav.Item>Login</Nav.Item>
          {/* <Nav.Item>
            <Icon as={BsPeople} size="1.5rem" color="#e98b9a" /> Login
          </Nav.Item> */}
        </Nav>
      </Navbar>
    </Affix>
  );
}

export default NavBar;
