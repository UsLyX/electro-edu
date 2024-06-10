import React from "react";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { list } from "./routersList";

const Routers = () => {
  return (
    <>
      <Router>
        <Routes>
          {list.map((route) => {
            return (
              <Route
                path={route.path}
                key={`route ${route.path}`}
                element={route.component}
              >
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
                  </>
                )}
              </Route>
            );
          })}
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