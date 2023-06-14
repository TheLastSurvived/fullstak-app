import React, { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import $api from "../api";
import ProfileTemplateList from "../components/ProfileTemplateList";
import PageLayout from "../layout/PageLayout";
import { selectUserData } from "../redux/user";

const ROLES = {
  "USER": "Пользователь",
  "ADMIN": "Администратор",
};

type RoleList = "USER" | "ADMIN";

const Profile = () => {
  const [templates, setTemplates] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();

  const getRoles  = (roles: RoleList[]): string => {
    if (!roles?.length) {
      return "Не указано";
    }

    const newRoles = roles?.map((role: RoleList) => ROLES[role]);

    return newRoles?.join(", ");
  };

  useEffect(() => {
    if (userData?.isAuth!==null && !userData?.isAuth) {
      navigate("/login");
    }
  }, [userData]);

  useEffect(() => {
    setLoading(true);
    $api.get("/user-templates").then((res) => {
      console.log("res: ", res.data);
      setLoading(false);
      setTemplates(res.data);
    }, (err) => {
      console.log("err: ", err);
      setLoading(false);
    });
  }, []);

  return (
    <PageLayout>
      <Container className="mt-1 pb-4">
        <Card
          border="secondary"
          bg="dark"
          text="white"
        >
          <Card.Header>Информация о профиле</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-1">
              <p>Email</p>
              <footer className="blockquote-footer">
                {userData?.user?.user?.email || "Не указано"}
              </footer>
            </blockquote>

            <blockquote className="blockquote mb-0">
              <p>Роли</p>
              <footer className="blockquote-footer">
                {getRoles(userData?.user?.user?.roles)}
              </footer>
            </blockquote>
          </Card.Body>
        </Card>

        {
          (loading && !templates?.length) 
            ? <div className="mt-3 d-flex justify-content-center">
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            : null
        }

        {
          (!loading) ? <ProfileTemplateList templates={templates!}/> : null
        }
        
      </Container>
    </PageLayout>
  );
};

export default Profile;