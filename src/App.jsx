import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Parent from './pages/Parent';
import GLAccount from './pages/GLAccount';
import Report from './pages/Report';
import SideBar from './pages/SideBar';
import ReportPdf from './pages/ReportPdf';
import useIsLoginPage from './pages/useIsLoginPage';
import ProductPdf from './pages/ProductPdf';
import PreviousParent from './pages/PreviousParent';
import Transcation from './pages/Transcation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('userName', 'user'); // Properly set item in localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userName');
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    setIsAuthenticated(!!storedUserName);
    //server
    console.log("API URL:", process.env.REACT_APP_API_URL); // Log the API URL

  }, []);

  return (
    <BrowserRouter>
      <AppContent isAuthenticated={isAuthenticated} login={login} logout={logout} />
    </BrowserRouter>
  );
}

const AppContent = ({ isAuthenticated, login, logout }) => {
  const isLoginPage = useIsLoginPage();
  const location = useLocation();

  const showSidebar = !isLoginPage &&
                      location.pathname !== '/previousParent' &&
                      location.pathname !== '/reportPdf' &&
                      location.pathname !== '/productPdf';

  return (
    <div className="app-container">
      {showSidebar && <SideBar logout={logout} />}
      <div className={`content ${showSidebar ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route path='/login' element={<LoginPage login={login} />} />
          <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to='/login' />} />
          <Route path='/parent' element={isAuthenticated ? <Parent /> : <Navigate to='/login' />} />
          <Route path='/glaccount' element={isAuthenticated ? <GLAccount /> : <Navigate to='/login' />} />
          <Route path='/reports' element={isAuthenticated ? <Report /> : <Navigate to='/login' />} />
          <Route path='/transc' element={isAuthenticated ? <Transcation /> : <Navigate to='/login' />} />
          <Route path='/reportPdf' element={<ReportPdf />} />
          <Route path='/productPdf' element={<ProductPdf />} />
          <Route path='/previousParent' element={<PreviousParent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
