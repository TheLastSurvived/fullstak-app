import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import $api from "../api";
import { userDataAction } from "../redux/user";
import PageLayout from "../layout/PageLayout";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import { Col, Container } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { useNavigate } from "react-router-dom";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";

  
export default function CreateTemplate() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const navigate = useNavigate();

  const onCreateButtonClick = () => {
    if (!image || !title || !description) {
      return toast.error("Заполните все поля!");
    }

    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("title", title);
    formData.append("description", description);

    $api.post("/template", formData).then((res) => {
      console.log("data: ", res);
      navigate(`/template/${res?.data?.data?.templateId}`);
    }, (err) => {
      toast.error(err?.response?.data?.message || "Неизвестная ошибка");
    });
    
  };

  const onFileInputChange = (e: any) => {
    console.log("e: ", e);
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));

  };

  return (
    <PageLayout>
      <Container fluid="sm">
        <Row className="justify-content-sm-center">
          <Col xs lg="7" className="justify-content-sm-center">
            <h4 className="mb-3 mt-3"><Badge bg="secondary">Создание шаблона</Badge></h4>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                title="Изображение шаблона"
                accept="image/png, image/jpeg"
                onChange={onFileInputChange}
              />
            </Form.Group>
            {
              imageUrl ? <Image className="mb-3" src={imageUrl} rounded fluid /> : null
            }
            <Form.Group className="mb-3">
              <FloatingLabel label="Название шаблона">
                <Form.Control
                  value={title}
                  onChange={(evt) => setTitle(evt?.target?.value)}
                  type="text" 
                  placeholder="Название..."
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Описание">
                <Form.Control
                  value={description}
                  onChange={(evt) => setDescription(evt?.target?.value)}
                  as="textarea"
                  placeholder="Опишите шаблон..."
                  style={{ height: "100px" }}
                  maxLength={150}
                />
              </FloatingLabel>
            </Form.Group>
            <Button variant="secondary" type="button" onClick={onCreateButtonClick}>
              Создать
            </Button>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}