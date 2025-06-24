import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18n/i18n";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./components/Test";
import CreateTemplate from "./pages/CreateTemplate";
import TemplateView from "./pages/TemplateView";
import Templates from "./pages/Templates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="form" element={<FormPage />} />
          <Route path="results" element={<Results />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="templates/create" element={<CreateTemplate />} />
          <Route path="/templates/:id" element={<TemplateView />} />
          <Route path="/templates" element={<Templates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
