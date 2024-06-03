import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { list } from './routersList'

const Routers = () => {
  return (
    <Router>
        <Routes>
            {
              list.map(route => {
                return (
                  <Route
                    path={route.path}
                    key={`route ${route.path}`}
                    element={
                        <route.component></route.component>
                    }
                  />
                );
              })
            }
        </Routes>
    </Router>
  )
}

export default Routers
