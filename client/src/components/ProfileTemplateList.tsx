import React, { FC } from "react";
import { Badge, Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";

import { useHolderjs } from "use-holderjs";
import $api from "../api";
import ProfileTemplateItem from "./ProfileTemplateItem";

interface ProfileTemplateListProps {
  templates: any[];
}

const ProfileTemplateList:FC<ProfileTemplateListProps> = ({ templates }) => {
  useHolderjs();

  if (!templates?.length) {
    return (
      <div className="mt-3 d-flex justify-content-center text-light flex-column align-items-center">
        <span className="text-center">У вас нет созданных шаблонов.
          Для создания перейдите на страницу шаблонов.
        </span>
        <LinkContainer to="/templates">
          <Nav.Link className="link-light">Перейти к шаблонам</Nav.Link>
        </LinkContainer>
      </div>
    );
  }

  return (
    <>
      <h4 className="mb-3 mt-3"><Badge bg="secondary">Созданные шаблоны:</Badge></h4>
      <Row xs={1} md={3} className="g-4">
        {templates.map((template) => <ProfileTemplateItem key={template._id} template={template} />)}
      </Row>

    </>
  );
};

export default ProfileTemplateList;