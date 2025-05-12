import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Dashboard page component
const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [campaigns, setCampaigns] = useState([]);

  // Load campaigns from localStorage
  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    setCampaigns(storedCampaigns);
  }, []);

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
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Campaigns</h2>
          <Link 
            to="/campaigns/create" 
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Create Campaign
          </Link>
        </div>
        
        {campaigns.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <p className="text-gray-600">
              You don't have any active campaigns yet. Click "Create Campaign" to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                
                {campaign.bannerImageData && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={campaign.bannerImageData} 
                      alt={campaign.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <div className="text-sm text-gray-600 mb-2">
                    <div>Location: {campaign.targeting.location || 'Any'}</div>
                    <div>Age: {campaign.targeting.ageRange.min}-{campaign.targeting.ageRange.max}</div>
                    {campaign.targeting.interests.length > 0 && (
                      <div>
                        Interests: {campaign.targeting.interests.join(', ')}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-lg font-semibold">{campaign.metrics.impressions}</div>
                      <div className="text-xs text-gray-500">Impressions</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">{campaign.metrics.clicks}</div>
                      <div className="text-xs text-gray-500">Clicks</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {campaign.metrics.clicks > 0 
                          ? ((campaign.metrics.clicks / campaign.metrics.impressions) * 100).toFixed(1) 
                          : '0'}%
                      </div>
                      <div className="text-xs text-gray-500">CTR</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t bg-gray-50 flex justify-end space-x-2">
                  <button className="px-3 py-1 text-xs text-indigo-600 hover:text-indigo-800">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-xs text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage; 