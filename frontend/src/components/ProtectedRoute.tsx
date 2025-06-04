import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '@/services/api';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const location = useLocation();

  useEffect(() => {
    let newStatus: 'authenticated' | 'unauthenticated' = 'unauthenticated';
    let shouldShowDefaultToast = true;

    const tokenExists = authService.isAuthenticated();
    const currentUser = authService.getCurrentUser();

    if (tokenExists && currentUser) {
      newStatus = 'authenticated';
      shouldShowDefaultToast = false; // Already authenticated, no need for "please login"
    } else {
      newStatus = 'unauthenticated';
      if (tokenExists && !currentUser) {
        // Inconsistent state: token exists, but no user data.
        authService.logout(); // Clear localStorage
        toast.error('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
        shouldShowDefaultToast = false; // Specific error shown
      } else if (!tokenExists) {
        // No token at all, "please login" toast will be shown if shouldShowDefaultToast is true
      }
    }

    setAuthStatus(newStatus);

    if (newStatus === 'unauthenticated' && shouldShowDefaultToast) {
      toast.error('Vui lòng đăng nhập để truy cập trang này');
    }
  }, [location.pathname]); // Re-check auth if the path changes

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-r-2 border-b-2"></div>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    // Pass the current location so we can redirect back after login
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // If authStatus === 'authenticated'
  return <>{children}</>;
};

export default ProtectedRoute;