import { useState, useEffect } from 'react';

const LocationSelector = ({ value, onChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [locationType, setLocationType] = useState('predefined'); // 'predefined' or 'custom'
  
  // Sample location data - in a real app, this would come from an API or larger dataset
  const countries = [
    { code: 'us', name: 'United States' },
    { code: 'ca', name: 'Canada' },
    { code: 'uk', name: 'United Kingdom' },
    { code: 'ae', name: 'United Arab Emirates' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    { code: 'all', name: 'All Countries' }
  ];
  
  // Regions by country
  const regions = {
    us: [
      { code: 'ca', name: 'California' },
      { code: 'ny', name: 'New York' },
      { code: 'tx', name: 'Texas' },
      { code: 'fl', name: 'Florida' },
      { code: 'all', name: 'All States' }
    ],
    ca: [
      { code: 'on', name: 'Ontario' },
      { code: 'qc', name: 'Quebec' },
      { code: 'bc', name: 'British Columbia' },
      { code: 'all', name: 'All Provinces' }
    ],
    uk: [
      { code: 'eng', name: 'England' },
      { code: 'sct', name: 'Scotland' },
      { code: 'wls', name: 'Wales' },
      { code: 'nir', name: 'Northern Ireland' },
      { code: 'all', name: 'All Regions' }
    ],
    ae: [
      { code: 'all', name: 'All Emirates' }
    ],
    au: [
      { code: 'nsw', name: 'New South Wales' },
      { code: 'qld', name: 'Queensland' },
      { code: 'vic', name: 'Victoria' },
      { code: 'all', name: 'All States' }
    ],
    in: [
      { code: 'mh', name: 'Maharashtra' },
      { code: 'dl', name: 'Delhi' },
      { code: 'ka', name: 'Karnataka' },
      { code: 'all', name: 'All States' }
    ],
    all: [
      { code: 'all', name: 'All Regions' }
    ]
  };
  
  // Cities by region
  const cities = {
    // US
    ca: ['Los Angeles', 'San Francisco', 'San Diego', 'All Cities'],
    ny: ['New York City', 'Buffalo', 'Albany', 'All Cities'],
    tx: ['Houston', 'Austin', 'Dallas', 'All Cities'],
    fl: ['Miami', 'Orlando', 'Tampa', 'All Cities'],
    // Canada
    on: ['Toronto', 'Ottawa', 'Hamilton', 'All Cities'],
    qc: ['Montreal', 'Quebec City', 'Laval', 'All Cities'],
    bc: ['Vancouver', 'Victoria', 'Kelowna', 'All Cities'],
    // UK
    eng: ['London', 'Manchester', 'Birmingham', 'All Cities'],
    sct: ['Edinburgh', 'Glasgow', 'Aberdeen', 'All Cities'],
    wls: ['Cardiff', 'Swansea', 'Newport', 'All Cities'],
    nir: ['Belfast', 'Derry', 'Lisburn', 'All Cities'],
    // UAE (directly cities without state/province level)
    all_ae: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'All Emirates'],
    // Australia
    nsw: ['Sydney', 'Newcastle', 'Wollongong', 'All Cities'],
    qld: ['Brisbane', 'Gold Coast', 'Cairns', 'All Cities'],
    vic: ['Melbourne', 'Geelong', 'Ballarat', 'All Cities'],
    // India
    mh: ['Mumbai', 'Pune', 'Nagpur', 'All Cities'],
    dl: ['New Delhi', 'Delhi NCR', 'All Cities'],
    ka: ['Bangalore', 'Mysore', 'Mangalore', 'All Cities'],
    // Default for "All"
    all: ['All Cities']
  };

  // Initialize from value prop
  useEffect(() => {
    if (value) {
      // Check if the value matches any of our predefined locations
      const parts = value.split(', ');
      
      if (parts.length >= 2) {
        // Try to match with our predefined locations
        const cityName = parts[0];
        const countryName = parts[parts.length - 1];
        
        const country = countries.find(c => c.name === countryName);
        
        if (country) {
          setSelectedCountry(country.code);
          setLocationType('predefined');
          
          // If there are 3 parts, we have city, region, country
          if (parts.length === 3) {
            const regionName = parts[1];
            const countryRegions = regions[country.code];
            const region = countryRegions?.find(r => r.name === regionName);
            
            if (region) {
              setSelectedRegion(region.code);
              
              const regionCities = cities[region.code];
              if (regionCities?.includes(cityName)) {
                setSelectedCity(cityName);
              }
            }
          } 
          // If UAE or other country with direct cities
          else if (parts.length === 2 && country.code === 'ae') {
            setSelectedRegion('all');
            const uaeCities = cities.all_ae;
            if (uaeCities?.includes(cityName)) {
              setSelectedCity(cityName);
            }
          }
        } else {
          // Not a match with our predefined locations
          setLocationType('custom');
          setCustomLocation(value);
        }
      } else {
        // Single value or not matching our format
        setLocationType('custom');
        setCustomLocation(value);
      }
    }
  }, [value]);

  // Update the location value when selections change
  useEffect(() => {
    if (locationType === 'predefined') {
      const country = countries.find(c => c.code === selectedCountry);
      if (!country) return;
      
      // Special case for "All Countries"
      if (selectedCountry === 'all') {
        onChange('Global');
        return;
      }
      
      // If no region is selected yet
      if (!selectedRegion) {
        onChange(country.name);
        return;
      }
      
      const region = regions[selectedCountry]?.find(r => r.code === selectedRegion);
      if (!region) return;
      
      // Special case for "All Regions"
      if (selectedRegion === 'all') {
        // Special case for UAE which doesn't have regions
        if (selectedCountry === 'ae') {
          if (!selectedCity || selectedCity === 'All Emirates') {
            onChange(`United Arab Emirates`);
          } else {
            onChange(`${selectedCity}, United Arab Emirates`);
          }
        } else {
          onChange(`All regions in ${country.name}`);
        }
        return;
      }
      
      // If no city is selected yet
      if (!selectedCity) {
        onChange(`${region.name}, ${country.name}`);
        return;
      }
      
      // Special case for "All Cities"
      if (selectedCity === 'All Cities') {
        onChange(`${region.name}, ${country.name}`);
        return;
      }
      
      // Full location with city, region, and country
      onChange(`${selectedCity}, ${region.name}, ${country.name}`);
    } else {
      // Custom location
      onChange(customLocation);
    }
  }, [locationType, selectedCountry, selectedRegion, selectedCity, customLocation, onChange]);

  return (
    <div>
      <div className="flex space-x-4 mb-3">
        <div className="flex items-center">
          <input
            id="locationTypePredefined"
            type="radio"
            value="predefined"
            checked={locationType === 'predefined'}
            onChange={() => setLocationType('predefined')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="locationTypePredefined" className="ml-2 block text-sm text-gray-700">
            Select from list
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="locationTypeCustom"
            type="radio"
            value="custom"
            checked={locationType === 'custom'}
            onChange={() => setLocationType('custom')}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="locationTypeCustom" className="ml-2 block text-sm text-gray-700">
            Custom location
          </label>
        </div>
      </div>
      
      {locationType === 'predefined' ? (
        <div className="space-y-3">
          {/* Country Selection */}
          <div>
            <label htmlFor="country" className="block text-xs font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedRegion('');
                setSelectedCity('');
              }}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Region Selection - Only show if a country is selected and it's not "All Countries" */}
          {selectedCountry && selectedCountry !== 'all' && (
            <div>
              <label htmlFor="region" className="block text-xs font-medium text-gray-700">
                {selectedCountry === 'ae' ? 'Emirate' : 'State/Province/Region'}
              </label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value);
                  setSelectedCity('');
                }}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a region</option>
                {regions[selectedCountry]?.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* City Selection - Only show if a region is selected and it's not "All Regions" */}
          {selectedRegion && selectedRegion !== 'all' && (
            <div>
              <label htmlFor="city" className="block text-xs font-medium text-gray-700">
                City
              </label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a city</option>
                {cities[selectedRegion]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Special case for UAE - show cities directly */}
          {selectedCountry === 'ae' && selectedRegion === 'all' && (
            <div>
              <label htmlFor="uaeCity" className="block text-xs font-medium text-gray-700">
                City
              </label>
              <select
                id="uaeCity"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a city</option>
                {cities.all_ae?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Display the current selection */}
          <div className="mt-2 text-sm text-gray-600">
            Selected: <span className="font-medium">{value || 'None'}</span>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., New York, USA or Global"
          />
          <p className="mt-1 text-xs text-gray-500">
            Enter a specific location or "Global" for worldwide targeting
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 