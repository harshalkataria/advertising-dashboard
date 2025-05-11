import { useAuth } from '../context/AuthContext';

// Dashboard page component
const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Ad Campaign Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</span>
            <button
              onClick={logout}
              className="px-3 py-1 text-sm text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your Ad Dashboard</h2>
          <p className="text-gray-600">
            This is a placeholder for the dashboard content. In the complete application,
            you would see your ad campaigns, analytics, and options to create new campaigns.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage; 