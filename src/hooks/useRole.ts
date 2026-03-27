import { useAuth } from '../contexts/AuthContext';
import type { UserRole } from '../types/database';

/**
 * Custom hook for role-based access control
 *
 * Usage examples:
 *
 * const { isAdmin, isDesigner, isManufacturer, hasRole, isAuthenticated } = useRole();
 *
 * if (isAdmin) {
 *   // Show admin features
 * }
 *
 * if (hasRole(['designer', 'manufacturer'])) {
 *   // Show features available to both designers and manufacturers
 * }
 */
export const useRole = () => {
  const { currentUser, userData } = useAuth();

  const isAuthenticated = !!currentUser && !!userData;
  const isAdmin = userData?.role === 'admin';
  const isDesigner = userData?.role === 'designer';
  const isManufacturer = userData?.role === 'manufacturer';

  const hasRole = (roles: UserRole[]): boolean => {
    if (!userData) return false;
    return roles.includes(userData.role);
  };

  return {
    isAuthenticated,
    isAdmin,
    isDesigner,
    isManufacturer,
    hasRole,
    role: userData?.role,
  };
};
