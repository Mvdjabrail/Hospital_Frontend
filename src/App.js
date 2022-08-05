import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./components/Content/SigninInContent/SigninIn";
import SignUpPage from "./components/Content/SigninUpContent/SigninUp";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";
import VideoChat from "./components/Content/TelemedContent/VideoChat";
import AdminPage from "./pages/AdminPage";
import AboutUsPage from "./pages/AboutUsPage";

import Room from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="contacts" element={<Contacts />}>
          <Route path="shop" element={<Shop />}>
          <Route path="telemed" element={<VideoChat />} />
           <Route path="about-us" element={<AboutUs />} /> 
          <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="/telemed/room/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
