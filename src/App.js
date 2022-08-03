import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./components/Content/SigninInContent/SigninIn";
import SignUpPage from "./components/Content/SigninUpContent/SigninUp";
import Layout from "./components/Layout/Layout";
import Contacts from "./pages/ContactsPages";



function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}>

          <Route path="contacts" element={<Contacts/>}></Route> 
          </Route>
          <Route path="signinIn" element={<SignInPage/>}/>
          <Route path="signinUp" element={<SignUpPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
