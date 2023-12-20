import React, { useContext } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter, NavLink, Navigate } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';

//include App.css
import './App.css';
import { AuthContext } from './context/AuthContext';
 
function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    console.log(currentUser);
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;