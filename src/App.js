/* eslint-disable no-mixed-operators */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";
import VideoChat from "./components/Content/TelemedContent/VideoChat";
import AdminPage from "./pages/AdminPage";
import AboutPage from './pages/AboutUsPage'
import Room from "./pages/Room";
import User from "./components/Content/UserContent/User";
import HomePage from "./pages/HomePage";
import Departments from "./pages/Departments";

const role = localStorage.getItem("role");


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="shop" element={<Shop />} />
          <Route path="telemed" element={<VideoChat />} />
          <Route path="" element={<HomePage />} />
          <Route path="departments" element={<Departments />} />
          {role === 'admin' &&
            <Route path="admin" element={<AdminPage />}
            /> || role === 'user' && <Route path="user" element={<User />} />
          }
          <Route path="about-us" element={<AboutPage />} />
        </Route >
        <Route path="/telemed/room/:id" element={<Room />} />
      </Routes >
    </BrowserRouter >
  );
}

export default App;
