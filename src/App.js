/* eslint-disable no-mixed-operators */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";
import Telemed from "./pages/TelemedPage";
import AdminPage from "./pages/AdminPage";
import AboutPage from './pages/AboutUsPage'
import RoomPage from "./pages/RoomPage";
import User from "./components/Content/UserContent/User";
import Doctor from "./components/Content/DoctorContent/Doctor";
import HomePage from "./pages/HomePage";
import Departments from "./pages/Departments";
import Docs from "./components/Content/DocsContent/Docs";

const role = localStorage.getItem("role");

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="shop" element={<Shop />} />
            <Route path="" element={<HomePage />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/:id" element={<Docs />}/>
          {(role === "admin" && (
            <Route path="admin" element={<AdminPage />} />
          )) ||
            (role === "user" && <Route path="user" element={<User />} />) ||
            (role === "doctor" && <Route path="doctor" element={<Doctor />} />)}
          <Route path="about-us" element={<AboutPage />} />
          <Route path="telemed" element={<Telemed />} />
        </Route >
        <Route path="/telemed/room/:id" element={<RoomPage />} />

      </Routes >
    </BrowserRouter >
  );
}

export default App;