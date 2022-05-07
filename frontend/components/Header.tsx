import { memo, FC } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import IUser from "interfaces/user.interface";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { useResetUserStateData } from "utils/useResetUserStateData";

const Header: FC<{
  totalCartItems: number;
  stateUser: Partial<IUser> | null;
}> = ({ totalCartItems, stateUser }) => {
  const { data } = useSession();
  const sessionUser = data?.user as Partial<IUser>;
  const dispatch = useDispatch();
  const resetData = useResetUserStateData();
  const user = stateUser ? stateUser : sessionUser;

  const logoutHandler = () => {
    resetData();
    signOut({
      callbackUrl: "/login",
    });
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
                  <i className="fas fa-shopping-cart"></i>
                  Cart {`${totalCartItems > 0 ? `(${totalCartItems})` : ""}`}
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

export default memo(Header);
