import React, { useContext } from "react";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { list } from "./routersList";
import { AuthContext } from "../context/authContext";
import NotFound from "../pages/NotFound";

const Routers = () => {

  const { token, user } = useContext(AuthContext)

  return (
    <>
      <Router>
        <Routes>

          {token && user ? 
            list.filter(item => item.isAuth == true).map(route => {
              return (
                <Route path={route.path} key={`route ${route.path}`} element={route.component}>
                  {route.path === '/admin' && (
                    <>
                      <Route index element={<Navigate to={route.childs[0].path} replace />} />
                      <Route path={route.childs[0].path} element={route.childs[0].component}/>
                    </>
                  )}
                  {route.path === '/student' && (
                    <>
                      <Route index element={<Navigate to={route.childs[0].path} replace />} />
                      <Route path={route.childs[0].path} element={route.childs[0].component}/>
                      <Route path={route.childs[1].path} element={route.childs[1].component}/>
                      <Route path={route.childs[2].path} element={route.childs[2].component}/>
                    </>
                  )}
                </Route>
              ) 
            }) 
            : 
            list.filter(item => item.isAuth == false).map(route => {
              return <Route path={route.path} key={`route ${route.path}`} element={route.component}/>
            })}
          <Route path="*" element={list.find(item => item.notFound).component} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Routers;