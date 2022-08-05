import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./components/Content/SigninInContent/SigninIn";
import SignUpPage from "./components/Content/SigninUpContent/SigninUp";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";
import VideoChat from "./components/Content/TelemedContent/VideoChat";
import AdminPage from "./pages/AdminPage";
<<<<<<< HEAD
import AboutUs from "./components/Content/AboutUsContent/AboutUs"

=======
import Room from "./pages/Room";
>>>>>>> aabcc6d292531ef3cf488bea8b5b46135d1bdbb4

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="shop" element={<Shop />}></Route>
          {/* <Route path="about-us" element={<AboutUs />} /> */}
          <Route path="admin" element={<AdminPage />} />
          </Route>
          <Route path="signinIn" element={<SignInPage/>}/>
          <Route path="signinUp" element={<SignUpPage/>}/>
          <Route path="/telemed" element={<VideoChat />} />
          <Route path="/telemed/room/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
