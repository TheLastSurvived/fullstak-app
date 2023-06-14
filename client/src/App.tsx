import React, { useEffect } from "react";
import Registration from "./pages/Registration";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { fetchIsAuth } from "./api/auth.api";
import { setCookie } from "./util/cookiesUtils";
import { COOKIES } from "./constants";
import { userDataAction } from "./redux/user";
import Template from "./pages/Template";
import Templates from "./pages/Templates";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import CreateTemplate from "./pages/CreateTemplate";
import EditTemplate from "./pages/EditTemplate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type FileKind = {
  "file-id": string;
  title: string;
  data: Record<string, any>[];
};

export type FileData = Record<string, FileKind>;

function App() {
  const dispatch = useDispatch();

  const isAuth = async () => {
    try {
      const data = await fetchIsAuth();
      setCookie(COOKIES.token, data.accessToken);
      localStorage.setItem("token", data.accessToken);
      dispatch(userDataAction.setUser(data));
    } catch (error) {
      console.log("error auth: ", error); 
      dispatch(userDataAction.logout({}));

    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/registration" element={ <Registration /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/work" element={<Template />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/template/:id" element={<Template />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-template" element={<CreateTemplate />} />
        <Route path="/edit-template/:id" element={<EditTemplate />} />
        <Route path="*" element={ <Navigate to="/" replace /> } />
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
