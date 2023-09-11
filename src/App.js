import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <div className=" font-mont bg-gray-100 h-[100vh]">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<DashBoard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
