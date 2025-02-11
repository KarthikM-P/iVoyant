import { useEffect, useState } from 'react';
import './Homepage.css';
import CountryDetail from './CountryDetail';

interface Country {
    cca3: string;
    name: {
        common: string;
    };
    flags: {
        png: string;
    };
    region: string;
}

const Homepage = () => {
    const [flaglist, setFlaglist] = useState<Country[]>([]);
    const [search, setSearch] = useState('');
    const [regionFilter, setRegionFilter] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((res) => res.json())
            .then((data: Country[]) => setFlaglist(data));
    }, []);
    console.log(flaglist);
    

    const filteredCountries = flaglist.filter((country) => {
        const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase());
        const matchesRegion = regionFilter ? country.region === regionFilter : true;
        return matchesSearch && matchesRegion;
    });

  
    const regions: Record<string, Country[]> = {};
    filteredCountries.forEach((country) => {
        const region = country.region;
        if (!regions[region]) {
            regions[region] = [];
        }
        regions[region].push(country);
    });
    console.log(regions);
    
    

    const regionList = Object.keys(regions);

   
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

  
    const handleRegionFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRegionFilter(e.target.value);
    };

 
    const handleCountryClick = (countryCode: string) => {
        setSelectedCountry(countryCode);
    };

    
    const handleCloseDetail = () => {
        setSelectedCountry(null);
    };

    return (
        <div className="main">
            <h1>COUNTRY FLAGS</h1>
            <h3>List of Countries</h3>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by country name..." 
                    value={search}
                    onChange={handleSearchChange}
                />
                <select value={regionFilter} onChange={handleRegionFilterChange}>
                    <option value="">All Regions</option>
                    {[...new Set(flaglist.map((country) => country.region))]
                        .map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                </select>
            </div>

            {selectedCountry ? (
                <CountryDetail countryCode={selectedCountry} onClose={handleCloseDetail} />
            ) : (
                regionList.map((region) => (
                    <div key={region} className="region-section">
                        <h2>{region}</h2>
                        <div className="country-grid">
                            {regions[region].map((country) => (
                                <div
                                    className="country-card"
                                    key={country.cca3}
                                    onClick={() => handleCountryClick(country.cca3)}
                                >
                                    <img src={country.flags.png} alt={`${country.name.common} flag`} />
                                    <p>{country.name.common}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Homepage;