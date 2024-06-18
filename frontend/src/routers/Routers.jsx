import React, { useContext, useEffect } from "react";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { list } from "./routersList";
import { AuthContext } from "../context/authContext";

const Routers = () => {

  const { token, user } = useContext(AuthContext)

  return (
    <>
      <Router key={'router'}>
        <Routes key={'routes'}>
          <Route path="/" key={'main_route'} element={list[0].component}>
            {token && user ? 
              user.role === 'Ученик' ? list[0].childs.filter(item => item.isAuth === true && item.student === true).map((route, index) => {
                return (
                  <>  
                      <Route key={`navigate ${index}`} index element={<Navigate to={route.path} key={`nav ${index}`} replace/>} />
                      <Route key={`route ${index}`} path={route.path} element={route.component}>
                        <Route key={`navigate ${route.childs[0].path}`} index element={<Navigate to={route.childs[0].path} key={`nav ${route.childs[0].path}`} replace />} />
                        <Route key={`route ${route.childs[0].path}`} path={route.childs[0].path} element={route.childs[0].component}/>
                        <Route key={`route ${route.childs[1].path}`} path={route.childs[1].path} element={route.childs[1].component}/>
                        <Route key={`route ${route.childs[2].path}`} path={route.childs[2].path} element={route.childs[2].component}/>
                        <Route key={`route ${route.childs[3].path}`} path={route.childs[3].path} element={route.childs[3].component}/>
                        <Route key={`route ${route.childs[4].path}`} path={route.childs[4].path} element={route.childs[4].component}/>
                        <Route key={`route ${route.childs[5].path}`} path={route.childs[5].path} element={route.childs[5].component}/>
                        <Route key={`route ${route.childs[6].path}`} path={route.childs[6].path} element={route.childs[6].component}/>
                        <Route key={`route ${route.childs[7].path}`} path={route.childs[7].path} element={route.childs[7].component}/>
                      </Route>
                  </>
                )
              })
              :
              user.role === 'Учитель' ? list[0].childs.filter(item => item.isAuth === true && item.teacher === true).map((route, index) => {
                return (
                  <>  
                      <Route key={`navigate ${index}`} index element={<Navigate to={route.path} key={`nav ${index}`} replace/>} />
                      <Route key={`route ${index}`} path={route.path} element={route.component}>
                        <Route key={`navigate ${route.childs[0].path}`} index element={<Navigate to={route.childs[0].path} key={`nav ${route.childs[0].path}`} replace />} />
                        <Route key={`route ${route.childs[0].path}`} path={route.childs[0].path} element={route.childs[0].component}/>
                        <Route key={`route ${route.childs[1].path}`} path={route.childs[1].path} element={route.childs[1].component}>
                          <Route key={`navigate ${route.childs[1].childs[0].path}`} index element={<Navigate to={route.childs[1].childs[0].path} key={`nav ${route.childs[1].childs[0].path}`} replace/>} />
                          <Route key={`route ${route.childs[1].childs[0].path}`} path={route.childs[1].childs[0].path} element={route.childs[1].childs[0].component}/>
                          <Route key={`route ${route.childs[1].childs[1].path}`} path={route.childs[1].childs[1].path} element={route.childs[1].childs[1].component}/>
                          <Route key={`route ${route.childs[1].childs[2].path}`} path={route.childs[1].childs[2].path} element={route.childs[1].childs[2].component}/>
                          <Route key={`route ${route.childs[1].childs[3].path}`} path={route.childs[1].childs[3].path} element={route.childs[1].childs[3].component}/>
                          <Route key={`route ${route.childs[1].childs[4].path}`} path={route.childs[1].childs[4].path} element={route.childs[1].childs[4].component}/>
                          <Route key={`route ${route.childs[1].childs[5].path}`} path={route.childs[1].childs[5].path} element={route.childs[1].childs[5].component}/>
                        </Route>
                      </Route>
                  </>
                )
              })
              :
              user.role === 'Администратор' && list[0].childs.filter(item => item.isAuth === true && item.admin === true).map((route, index) => {
                return (
                  <>  
                      <Route key={`navigate ${index}`} index element={<Navigate to={route.path} key={`nav ${index}`} replace/>} />
                      <Route key={`route ${route.path}`} path={route.path} element={route.component}>
                        <Route key={`navigate ${route.childs[0].path}`} index element={<Navigate to={route.childs[0].path} key={`nav ${route.childs[0].path}`} replace />} />
                        <Route key={`route ${route.childs[0].path}`} path={route.childs[0].path} element={route.childs[0].component}/>
                        <Route key={`route ${route.childs[1].path}`} path={route.childs[1].path} element={route.childs[1].component}>
                          <Route key={`navigate ${route.childs[1].childs[0].path}`} index element={<Navigate to={route.childs[1].childs[0].path} key={`nav ${route.childs[1].childs[0].path}`} replace/>} />
                          <Route key={`route ${route.childs[1].childs[0].path}`} path={route.childs[1].childs[0].path} element={route.childs[1].childs[0].component}/>
                          <Route key={`route ${route.childs[1].childs[1].path}`} path={route.childs[1].childs[1].path} element={route.childs[1].childs[1].component}/>
                        </Route>
                      </Route>
                  </>
                )
              })
            :
            list[0].childs.filter(item => item.isAuth === false).map((route, index) => {
              return (
                <>
                  <Route key={`navigate ${index}`} index element={<Navigate to={route.path} key={`nav ${index}`} replace/>} />
                  <Route key={`route ${route.path}`} path={route.path} element={route.component}/>
                </>
              )
            })}
          </Route>
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