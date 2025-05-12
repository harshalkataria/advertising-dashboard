import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSelector from './LocationSelector';

const CampaignForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [campaignName, setCampaignName] = useState('');
  const [bannerType, setBannerType] = useState('image'); // 'image' or 'url'
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [bannerPreview, setBannerPreview] = useState('');
  
  // Targeting state
  const [ageRange, setAgeRange] = useState({ min: 18, max: 65 });
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
    }
  };

  // Handle adding interests
  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  // Handle removing interests
  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(item => item !== interest));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Validate form
      if (!campaignName.trim()) {
        throw new Error('Campaign name is required');
      }
      
      if (bannerType === 'image' && !bannerImage) {
        throw new Error('Please upload a banner image');
      }
      
      if (bannerType === 'url' && !bannerUrl.trim()) {
        throw new Error('Please provide a banner URL');
      }
      
      // Create campaign object
      const newCampaign = {
        id: Date.now().toString(), // Simple unique ID
        name: campaignName,
        bannerType,
        bannerUrl: bannerType === 'url' ? bannerUrl : '',
        bannerImageData: bannerType === 'image' && bannerImage ? await readFileAsDataURL(bannerImage) : '',
        targeting: {
          ageRange,
          location,
          interests
        },
        status: 'active',
        createdAt: new Date().toISOString(),
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0
        }
      };
      
      // Get existing campaigns from localStorage
      const existingCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
      
      // Add new campaign
      const updatedCampaigns = [...existingCampaigns, newCampaign];
      
      // Save to localStorage
      localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
      
      // Show success message
      setSuccess(true);
      
      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError(err.message || 'Failed to create campaign');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to read file as data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Campaign</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">Campaign created successfully! Redirecting...</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campaign Name */}
        <div>
          <label htmlFor="campaignName" className="block text-sm font-medium text-gray-700">
            Campaign Name
          </label>
          <input
            id="campaignName"
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Summer Sale 2024"
          />
        </div>
        
        {/* Banner Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner
          </label>
          
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <input
                id="bannerTypeImage"
                type="radio"
                value="image"
                checked={bannerType === 'image'}
                onChange={() => setBannerType('image')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="bannerTypeImage" className="ml-2 block text-sm text-gray-700">
                Upload Image
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="bannerTypeUrl"
                type="radio"
                value="url"
                checked={bannerType === 'url'}
                onChange={() => setBannerType('url')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="bannerTypeUrl" className="ml-2 block text-sm text-gray-700">
                Image URL
              </label>
            </div>
          </div>
          
          {bannerType === 'image' ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          ) : (
            <input
              type="url"
              value={bannerUrl}
              onChange={(e) => {
                setBannerUrl(e.target.value);
                setBannerPreview(e.target.value);
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/banner.jpg"
            />
          )}
          
          {bannerPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <img 
                src={bannerPreview} 
                alt="Banner preview" 
                className="max-h-40 border border-gray-300 rounded-md"
                onError={() => {
                  setBannerPreview('');
                  if (bannerType === 'url') {
                    setError('Invalid image URL. Please provide a valid image URL.');
                  }
                }}
              />
            </div>
          )}
        </div>
        
        {/* Audience Targeting Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Targeting</h3>
          
          {/* Age Range */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Range
            </label>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="minAge" className="block text-xs text-gray-500">Min</label>
                <input
                  id="minAge"
                  type="number"
                  min="13"
                  max="100"
                  value={ageRange.min}
                  onChange={(e) => setAgeRange({...ageRange, min: parseInt(e.target.value)})}
                  className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div>
                <label htmlFor="maxAge" className="block text-xs text-gray-500">Max</label>
                <input
                  id="maxAge"
                  type="number"
                  min="13"
                  max="100"
                  value={ageRange.max}
                  onChange={(e) => setAgeRange({...ageRange, max: parseInt(e.target.value)})}
                  className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          {/* Location - Now using our new LocationSelector component */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <LocationSelector value={location} onChange={setLocation} />
          </div>
          
          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <div className="flex">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Technology, Sports, Fashion"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
            
            {interests.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                    >
                      <span className="sr-only">Remove {interest}</span>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg disabled:opacity-50"
          >
            {isLoading ? 'Creating Campaign...' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
