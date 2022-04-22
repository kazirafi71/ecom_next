import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import Styles from "./NavbarComp.module.css";
import { useRouter } from "next/router";

const NavbarComp = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mx-auto">
            <Link href="/">
              <a
                className={
                  router.pathname == "/"
                    ? Styles.active_navItem_style
                    : Styles.navItem_style
                }
              >
                Home
              </a>
            </Link>
            <Link href="/cart">
              <a
                className={
                  router.pathname == "/cart"
                    ? Styles.active_navItem_style
                    : Styles.navItem_style
                }
              >
                Cart
              </a>
            </Link>
            <Link href="/create">
              <a
                className={
                  router.pathname == "/create"
                    ? Styles.active_navItem_style
                    : Styles.navItem_style
                }
              >
                Create
              </a>
            </Link>
            <Link href="/login">
              <a
                className={
                  router.pathname == "/login"
                    ? Styles.active_navItem_style
                    : Styles.navItem_style
                }
              >
                Login
              </a>
            </Link>
            <Link href="/signup">
              <a
                className={
                  router.pathname == "/signup"
                    ? Styles.active_navItem_style
                    : Styles.navItem_style
                }
              >
                SignUp
              </a>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
