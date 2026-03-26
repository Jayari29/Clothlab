import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Catalog from './pages/Catalog';
import ConsumerDashboard from './pages/ConsumerDashboard';
import ManufacturerDashboard from './pages/ManufacturerDashboard';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Order from './pages/Order';
import NotFound from './pages/NotFound';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />

          {/* Protected routes - require authentication */}
          <Route
            path="consumer"
            element={
              <ProtectedRoute allowedRoles={['designer', 'admin']}>
                <ConsumerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="manufacturer"
            element={
              <ProtectedRoute allowedRoles={['manufacturer', 'admin']}>
                <ManufacturerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Editor outside MainLayout for full-screen 3D experience */}
        <Route
          path="/editor"
          element={
            <ProtectedRoute allowedRoles={['designer', 'admin']}>
              <Editor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
