import React, { ReactNode, useState } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  try {
    if (hasError) {
      throw new Error("Something went wrong.");
    }
    return <>{children}</>;
  } catch (error) {
    console.error("Error caught by ErrorBoundary:", error);
    setHasError(true);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold text-red-500">Something went wrong.</h1>
      </div>
    );
  }
};

export default ErrorBoundary;
