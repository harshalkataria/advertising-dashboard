import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CampaignCreatePage from './pages/CampaignCreatePage';
import CampaignEditPage from './pages/CampaignEditPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/campaigns/create" 
            element={
              <ProtectedRoute>
                <CampaignCreatePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/campaigns/edit/:id" 
            element={
              <ProtectedRoute>
                <CampaignEditPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect to dashboard if authenticated, otherwise to login */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
