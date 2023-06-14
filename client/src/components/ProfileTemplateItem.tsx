import React, { FC, useEffect, useState } from "react";
import { Card, Col, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import $api from "../api";
import { selectUserData } from "../redux/user";

interface ProfileTemplateItemProps {
  template: any;
}

const ProfileTemplateItem: FC<ProfileTemplateItemProps> = ({ template }) => {
  const [published, setPublished] = useState<boolean>(template?.isPublished || false);
  const [deleted, setDeleted] = useState<boolean>(false);

  const { user } = useSelector(selectUserData);

  useEffect(() => {
    setPublished(template?.isPublished || false);
  }, [template]);

  const publishTemplate = () => {
    $api.post(`/publish-template/${template._id}`).then(() => {
      setPublished(true);
    }, (err) => {
      console.log("err: ", err);
    });
  };

  const deleteTemplate = () => {
    $api.delete(`/template/${template._id}`).then(() => {
      setDeleted(true);
    }, (err) => {
      console.log("err: ", err);
    });
  };

  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          // src="holder.js/100px160?text=Нет фото"
          src={ template?.imageFileName ? `http://localhost:3001/images/${template?.imageFileName}` : "holder.js/100px160?text=Нет фото"}
        />
        <Card.Body>
          <Card.Title>{template?.title}</Card.Title>
          <Card.Text>{template?.description}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center text-light flex-column align-items-center">
          <LinkContainer to={`/template/${template._id}`}>
            <Nav.Link>К шаблону</Nav.Link>
          </LinkContainer>

          <LinkContainer to={`/edit-template/${template._id}`}>
            <Nav.Link>Изменить описание</Nav.Link>
          </LinkContainer>

          {user?.user?.roles?.includes("ADMIN") 
            ? <>{ !published ? <Nav.Link onClick={publishTemplate}>Опубликовать</Nav.Link> : <Nav.Link disabled>Опубликован</Nav.Link> }</>
            : null
          }
 
          { !deleted ? <Nav.Link onClick={deleteTemplate}>Удалить</Nav.Link> : <Nav.Link disabled>Удален</Nav.Link>}

        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ProfileTemplateItem;