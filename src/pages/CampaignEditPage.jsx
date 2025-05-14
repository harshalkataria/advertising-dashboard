import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';

const CampaignEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load campaign data from localStorage
    const loadCampaign = () => {
      try {
        const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
        const foundCampaign = campaigns.find(c => c.id === id);
        
        if (!foundCampaign) {
          throw new Error('Campaign not found');
        }
        
        setCampaign(foundCampaign);
      } catch (err) {
        setError(err.message || 'Failed to load campaign');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCampaign();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading campaign data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {campaign && <CampaignForm initialData={campaign} isEditing={true} />}
      </main>
    </div>
  );
};

export default CampaignEditPage;
