import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import $api from "../api";
import TemplateList from "../components/TemplateList";
import PageLayout from "../layout/PageLayout";
import { selectUserData } from "../redux/user";

const Templates = () => {
  const [templates, setTemplates] = useState<any[] | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const userData = useSelector(selectUserData);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userData?.isAuth!==null && !userData?.isAuth) {
      navigate("/login");
    }
  }, [userData]);

  useEffect(() => {
    setloading(true);
    $api.get("/templates").then((res) => {
      setloading(false);
      setTemplates(res.data);
    }, () => {
      setloading(false);
    });
  }, []);

  return (
    <PageLayout>
      <Container fluid="sm">
        { (!loading) ? <TemplateList templates={templates!} /> : null}

        {
          loading 
            ? <div className="mt-3 d-flex justify-content-center">
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
            : null
        }
      </Container>
    </PageLayout>
  );
};

export default Templates;