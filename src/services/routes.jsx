import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layout/defaultLayout";
const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/wallet/:id" element={<DefaultLayout />} />
      </Routes>
    </Router>
  );
};

export default Routers;
