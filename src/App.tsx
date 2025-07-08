import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default App; 