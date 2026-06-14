import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import useAuthStore from "./store/authStore";
import axios from "./api/axios";
import MainLayout from "./layouts/MainLayout";
import NotesPage from "./pages/NotesPage";
import SnippetsPage from "./pages/SnippetsPage";
import BugJournalPage from "./pages/BugJournalPage";
import KnowledgeGraphPage from "./pages/KnowledgeGraphPage";
import SettingsPage from "./pages/SettingsPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import LandingPage from "./pages/LandingPage";

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  if (isLoading) return null;
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    axios.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setLoading(false));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/snippets" element={<SnippetsPage />} />
          <Route path="/bugs" element={<BugJournalPage />} />
          <Route path="/graph" element={<KnowledgeGraphPage />} />
          <Route path="/ai" element={<AIAssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
