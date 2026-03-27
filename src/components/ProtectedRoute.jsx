import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from 'src/utils/auth-utils';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // If not authenticated, don't render children
  if (!isAuthenticated()) {
    return null;
  }

  return children;
};

export default ProtectedRoute; 