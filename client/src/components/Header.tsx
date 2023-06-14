import React from "react";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, userDataAction } from "../redux/user";
import { fetchLogout } from "../api/auth.api";
import { deleteCookie } from "../util/cookiesUtils";
import { COOKIES } from "../constants";
import {LinkContainer} from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const data = await fetchLogout();
      deleteCookie(COOKIES.token);
      localStorage.removeItem("token");
      dispatch(userDataAction.logout(data));
    } catch (error) {
      console.log("error auth: ", error); 
    }
  };

  const onProfileButtonClick = () => {
    navigate("/profile");
  };

  return (
    <Navbar>
      <Container>
        {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
        <Nav className="me-auto">
          <LinkContainer to="/">
            <Nav.Link>Главная</Nav.Link>
          </LinkContainer>
          {
            user?.isAuth 
              ? <LinkContainer to="/templates">
                <Nav.Link>Шаблоны</Nav.Link>
              </LinkContainer> : null
          }
        </Nav>
        {
          user?.isAuth
            ? <Dropdown>
              <Dropdown.Toggle id="dropdown-button-white-example1" variant="secondary">
                {user?.user?.user?.email || "Пользователь"}
              </Dropdown.Toggle>

              <Dropdown.Menu variant="white">
                <Dropdown.Item onClick={onProfileButtonClick}>Профиль</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Выйти</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> 
            : <>
              <LinkContainer to="/registration">
                <Nav.Link>Регистрация</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Вход</Nav.Link>
              </LinkContainer>
            </>
        }
        
      </Container>
    </Navbar>
  );
};

export default Header;