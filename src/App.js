import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Contacts from "./pages/ContactsPages";



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}></Route>
          <Route path="contact" element={<Contacts/>}></Route> 
        </Routes>
      </BrowserRouter>
  );
}

export default App;
