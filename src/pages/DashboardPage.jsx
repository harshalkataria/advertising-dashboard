import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Dashboard page component
const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  // Load campaigns from localStorage
  useEffect(() => {
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    setCampaigns(storedCampaigns);
  }, []);

  // Handle campaign deletion
  const handleDeleteCampaign = (campaignId) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      // Filter out the campaign to delete
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
      
      // Update state and localStorage
      setCampaigns(updatedCampaigns);
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    }
  };

  // Handle campaign edit
  const handleEditCampaign = (campaignId) => {
    // In a full implementation, you would navigate to an edit page with the campaign ID
    // For now, we'll just alert that this feature is coming soon
    alert('Edit functionality coming soon!');
    
    // Future implementation would be:
    // navigate(`/campaigns/edit/${campaignId}`);
  };

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
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200"
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
              <div 
                key={campaign.id} 
                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 transform hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full"
              >
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-lg">{campaign.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                
                {/* Banner Preview */}
                <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {campaign.bannerImageData ? (
                    <img 
                      src={campaign.bannerImageData} 
                      alt={campaign.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : campaign.bannerUrl ? (
                    <img 
                      src={campaign.bannerUrl} 
                      alt={campaign.name} 
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-sm">No banner image</div>
                  )}
                </div>
                
                <div className="p-4 flex-grow">
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
                
                <div className="p-4 border-t bg-gray-50 flex justify-end space-x-2 mt-auto">
                  <button 
                    onClick={() => handleEditCampaign(campaign.id)}
                    className="px-3 py-1 text-xs bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 hover:text-indigo-800 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100 hover:text-red-800 transition-colors duration-200"
                  >
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