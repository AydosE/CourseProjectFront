import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n/i18n";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="form" element={<FormPage />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
