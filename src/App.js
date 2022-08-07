import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";
import Telemed from "./components/Content/TelemedContent/Telemed";
import AdminPage from "./pages/AdminPage";
import AboutPage from './pages/AboutUsPage'

const role = localStorage.getItem("role");


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="shop" element={<Shop />}></Route>
          <Route path="telemed" element={<Telemed />} />
          {role === 'admin' ? (
            <Route path="admin" element={<AdminPage />}
            />) : (<Route path="admin" element={<Navigate to='/' replace />} />)
          }
          <Route path="about-us" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;