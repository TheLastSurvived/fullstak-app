import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import { Icon2Square, Icon1Square, Icon3Square } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/user";

const Main = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(selectUserData);

  return (
    <PageLayout>
      <header>
        <div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-6">
              <div className="text-center my-2">
                <h1 className="display-5 fw-bolder text-white mb-2">Сервис для создания изображений!</h1>
                <p className="lead text-white mb-4">С помощью данного сервиса вы можете легко создавать, редактировать, сохранять изображения посредством удобных шаблонов, рабочего пространства и многого другого!</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                  {/* <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a> */}
                  {
                    isAuth
                      ? <Button variant="secondary" size="lg" onClick={() => navigate("/templates")}>Перейти к шаблонам</Button>
                      : <>
                        <Button variant="secondary" size="lg" onClick={() => navigate("/login")}>Войти</Button>
                        <Button variant="secondary" size="lg" onClick={() => navigate("/registration")}>Зарегистрироваться</Button>
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
       <section className="py-1 mt-1 pt-1" id="features">
        <div className="container px-5 my-5">
          <div className="row gx-5">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <Icon1Square color="white" className="mb-3" size={40}/>
              <h2 className="h4 fw-bolder text-white">Выберите шаблон</h2>
              <p className="text-white">Перейдите на вкладку &ldquo;Шаблоны&ldquo;, затем выберите один из предложенных или создайте пустой.</p>
              {/* <a className="text-decoration-none" href="#!">
                            Call to action
                <i className="bi bi-arrow-right"></i>
              </a> */}
            </div>
            <div className="col-lg-4 mb-5 mb-lg-0">
              <Icon2Square color="white" className="mb-3" size={40}/>
              <h2 className="h4 fw-bolder text-white">Создайте изображение</h2>
              <p className="text-white">С помощью удобных инструментов кастомизации шаблонов, текста и др. создайте свое собственное изображение.</p>
              {/* <a className="text-decoration-none" href="#!">
                            Call to action
                <i className="bi bi-arrow-right"></i>
              </a> */}
            </div>
            <div className="col-lg-4">
              <Icon3Square color="white" className="mb-3" size={40}/>
              <h2 className="h4 fw-bolder text-white">Другое</h2>
              <p className="text-white">После создания вы можете сохранить изображение либо вернуться к нему позже во вкладке профиля.</p>
              {/* <a className="text-decoration-none" href="#!">
                            Call to action
                <i className="bi bi-arrow-right"></i>
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Main;