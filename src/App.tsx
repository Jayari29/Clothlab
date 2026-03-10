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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="consumer" element={<ConsumerDashboard />} />
          <Route path="manufacturer" element={<ManufacturerDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Editor outside MainLayout for full-screen 3D experience */}
        <Route path="/editor" element={<Editor />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
