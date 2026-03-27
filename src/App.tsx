import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Editor = lazy(() => import('./pages/Editor'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ConsumerDashboard = lazy(() => import('./pages/ConsumerDashboard'));
const ManufacturerDashboard = lazy(() => import('./pages/ManufacturerDashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const Order = lazy(() => import('./pages/Order'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
  <div
    style={{
      minHeight: '40vh',
      display: 'grid',
      placeItems: 'center',
      color: '#475569',
      fontSize: '0.95rem',
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
