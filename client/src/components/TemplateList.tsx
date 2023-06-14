import React, { FC } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

import { useHolderjs } from "use-holderjs";
import $api from "../api";

interface TemplateListProps {
  templates: any[];
}

const TemplateList: FC<TemplateListProps> = ({ templates }) => {
  useHolderjs();

  const navigate = useNavigate();

  const onUseTemplateButtonClick = async (id: string): Promise<void> => {
    await $api.post(`/clone-template/${id}`).then((res) => {
      navigate(`/template/${res.data._id}`);
    }, (err) => {
      console.log("err: ", err);
    });
  };

  const onUseEmptyTemplateButtonClick = (): void => {
    navigate("/create-template");
  };

  // if (!templates?.length) {
  //   return (
  //     <div className="mt-3 d-flex justify-content-center text-light flex-column align-items-center">
  //       <span className="text-center">На данный момент нет шаблонов</span>
  //     </div>
  //   );
  // }

  return (
    <Row xs={1} md={3} className="g-4 mt-1">
      <Col>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160?text=Пустой шаблон" />
          <Card.Body>
            <Card.Title>Пустой шаблон</Card.Title>
            <Card.Text>Используйте пустой шаблон если хотите создать свою работу полностью с нуля.</Card.Text>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-center">
            <Button
              variant="secondary"
              onClick={onUseEmptyTemplateButtonClick}
            >
                Использовать шаблон
            </Button>
          </Card.Footer>
        </Card>
      </Col>
      {templates?.map((template) => (
        <Col key={template._id}>
          <Card>
            <Card.Img
              variant="top"
              src={ template?.imageFileName ? `http://localhost:3001/images/${template?.imageFileName}` : "holder.js/100px160?text=Нет фото"}
            />
            <Card.Body>
              <Card.Title>{template?.title}</Card.Title>
              <Card.Text>{template?.description}</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              <Button
                variant="secondary"
                onClick={() => onUseTemplateButtonClick(template._id)}
              >
                Использовать шаблон
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TemplateList;