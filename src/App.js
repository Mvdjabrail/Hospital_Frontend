import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Shop from "./pages/Shop";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}></Route>
          <Route path="/Shop" element={<Shop />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
