import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";

import "./i18n/i18n";

import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Test from "./components/Test";
import CreateTemplate from "./pages/CreateTemplate";
import TemplateView from "./pages/TemplateView";
import Templates from "./pages/Templates";
import FillForm from "./pages/FillForm";
import FormView from "./pages/FormView";
import Profile from "./pages/Profile";
import EditTemplate from "./pages/EditTemplate";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import UserView from "./pages/UserView";
import { Toaster } from "sonner";
import TemplatePreview from "./pages/TemplatePreview";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="test" element={<Test />} />
              <Route path="form" element={<FormPage />} />
              <Route path="forms/:id" element={<FormView />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="templates/create" element={<CreateTemplate />} />
              <Route path="templates/:id" element={<TemplateView />} />
              <Route path="templates" element={<Templates />} />
              <Route path="templates/:id/fill" element={<FillForm />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-template/:id" element={<EditTemplate />} />
              <Route
                path="/templates/:id/preview"
                element={<TemplatePreview />}
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="/users/:id" element={<UserView />} />
            </Route>
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </Router>
        <Toaster richColors position="top-right" />
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
