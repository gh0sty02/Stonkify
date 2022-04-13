import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "reducers/userInfoSlice";
import { useLoginMutation } from "services/userApi";
import { AppState } from "store";
import SearchBox from "./SearchBox";

const Header = () => {
  const [_, { data: user }] = useLoginMutation({ fixedCacheKey: "login" });
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="pb-3">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>Stonkify</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ justifyContent: "space-between" }}
          >
            <SearchBox />
            <Nav className="ml-auto ">
              <Link href="/cart" passHref>
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </Link>
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <Link href="/profile" passHref prefetch={false}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link href="/login" passHref>
                  <Nav.Link>
                    {" "}
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </Link>
              )}
              {user && user.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <Link href="/admin/userList" passHref prefetch={false}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </Link>
                  <Link href="/admin/productList/1" passHref prefetch={false}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </Link>
                  <Link href="/admin/orderList" passHref prefetch={false}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
