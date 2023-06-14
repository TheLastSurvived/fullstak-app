import React from "react";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <Container fluid style={{padding: 0}}>
      <Header />
      {children}
    </Container>
  );
};

export default PageLayout;