import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";


function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
