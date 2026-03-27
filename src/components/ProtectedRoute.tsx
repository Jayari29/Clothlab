import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/database';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * ProtectedRoute component - Wraps routes that require authentication
 *
 * Usage examples:
 *
 * 1. Require any authenticated user:
 * <ProtectedRoute>
 *   <SomePage />
 * </ProtectedRoute>
 *
 * 2. Require specific role:
 * <ProtectedRoute allowedRoles={['admin']}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 *
 * 3. Require multiple roles:
 * <ProtectedRoute allowedRoles={['designer', 'manufacturer']}>
 *   <OrdersPage />
 * </ProtectedRoute>
 */
export const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = '/auth'
}: ProtectedRouteProps) => {
  const { currentUser, userData, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser || !userData) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userData.role)) {
    // Redirect to appropriate dashboard based on role
    const defaultRedirect = userData.role === 'manufacturer'
      ? '/manufacturer'
      : userData.role === 'admin'
      ? '/'
      : '/consumer';

    return <Navigate to={defaultRedirect} replace />;
  }

  // User is authenticated and has correct role
  return <>{children}</>;
};
