import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/Home/HomePage";
import About from "./components/pages/About/About";
import Contacts from "./components/pages/Contacts/Contacts";
import "bootstrap/dist/css/bootstrap.min.css";
import Services from "./components/pages/Services/Services";
import Layout from "./components/Layout/Layout";
import ServiceInfo from "./components/pages/Services/ServiceInfo";
import ScrollToTop from "./components/ScrollToTop";
import Calendar from "react-calendar";
import Admin from "./components/Admin/Admin";
import './index.css';


function App() {
  const role = localStorage.getItem("role");


  return (
    <div className='APP'>
      <BrowserRouter>
        <Routes>

          <Route path="/*" element={<Layout />}>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}