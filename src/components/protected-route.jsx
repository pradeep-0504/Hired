import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  // If auth state is loaded and user is not signed in
  if (isLoaded && !isSignedIn) {
    return <Navigate to='/?sign-in=true' />;
  }

  // If user is signed in but hasn't completed onboarding
  if (user && !user?.unsafeMetadata?.role && pathname !== '/onboarding') {
    return <Navigate to='/onboarding' />;
  }

  // Role-based redirection
  // if (requiredRole && user?.unsafeMetadata?.role !== requiredRole) {
  //   const userRole = user?.unsafeMetadata?.role;
  //   const redirectPath = userRole === 'recruiter' ? '/post-job' : '/jobs';
  //   return <Navigate to={redirectPath} />;
  // }

  return children;
};

export default ProtectedRoute;
