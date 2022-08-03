import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";
import Contacts from "./pages/ContactsPages";



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}></Route>
          <Route path="/Shop" element={<Shop />}></Route>
          <Route path="/*" element={<Layout />}></Route>
          <Route path="contacts" element={<Contacts/>}></Route> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
