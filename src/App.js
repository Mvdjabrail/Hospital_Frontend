import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./components/Content/SigninInContent/SigninIn";
import SignUpPage from "./components/Content/SigninUpContent/SigninUp";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";
import VideoChat from "./components/Content/TelemedContent/VideoChat";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="Shop" element={<Shop />}></Route>
          <Route path="contacts" element={<Contacts />} />
          <Route path="telemed" element={<VideoChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
