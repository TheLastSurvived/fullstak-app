import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import $api from "../api";
import { selectUserData, userDataAction } from "../redux/user";
import PageLayout from "../layout/PageLayout";
import { Badge, Col, Container, FloatingLabel, Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
  
export default function Registration() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();
  const { isAuth } = useSelector(selectUserData);

  const onRegisterButtonClick = () => {
    if (password !== confirmPassword) {
      return toast.error("Пароли не совпадают");
    }
    $api.post("/register", {email, password}).then((data) => {
      navigate("/login");
    }, (err) => {
      toast.error(err?.response?.data?.message || "Неизвестная ошибка");
    });
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <PageLayout>
      <Container fluid="sm">
        <Row className="justify-content-sm-center">
          <Col xs lg="7" className="justify-content-sm-center">
            <h4 className="mb-3 mt-3"><Badge bg="secondary">Регистрация</Badge></h4>
            <Form.Group className="mb-3">
              <FloatingLabel label="Email">
                <Form.Control
                  value={email}
                  onChange={(evt) => setEmail(evt?.target?.value)}
                  type="email" 
                  placeholder="example@example.com"
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Пароль">
                <Form.Control
                  value={password}
                  onChange={(evt) => setPassword(evt?.target?.value)}
                  type="password" 
                  placeholder="Пароль..."
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel label="Подтвердите пароль">
                <Form.Control
                  value={confirmPassword}
                  onChange={(evt) => setConfirmPassword(evt?.target?.value)}
                  type="password" 
                  placeholder="Подтвердите пароль..."
                />
              </FloatingLabel>
            </Form.Group>
            
            <div className="d-flex justify-content-between">
              <Button variant="secondary" type="button" onClick={onRegisterButtonClick}>
                Зарегистрироваться
              </Button>

              <LinkContainer to="/login">
                <Nav.Link>Уже есть аккаунт?</Nav.Link>
              </LinkContainer>
            </div>
          </Col>
        </Row>

      </Container>
    </PageLayout>
  );
}